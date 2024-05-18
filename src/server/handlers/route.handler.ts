import { FastifyInstance as AppInstance, RouteOptions } from 'fastify';
import { exceptionLog } from '~/helpers';
import { combineRoutes } from '~/controllers';
import container from '../DI/DIContainer';
import { GetMetaData } from './request.handler';
import { validatePayload } from './payload.handler';
import { serverError } from './response.handler';
import { Exception } from './error.handler';
import { ReplayX, ResponseX } from '../types';

const attachRouter = (app: AppInstance) => {
    combineRoutes?.forEach((item) => {
        item.routes.forEach(Controller => {
            const controllerInstance: any = container.get(Controller.name);
            const metaData = GetMetaData(controllerInstance);

            const { controllerMiddleware = [], controller: controllerPath, routes } = metaData;

            Object.entries(routes).forEach(([methodName, route]) => {
                const { method: routeMethod, middleware: routeMiddleware = [] } = route;
                const paramValidationMiddleware = route?.sanitizeSchema ? [validatePayload(route?.sanitizeSchema)] : [];

                const urlPrefix = item?.prefix ? item?.prefix : '';
                const routeOptions: RouteOptions = {
                    method: routeMethod,
                    url: ('/api/' + urlPrefix + '/' + controllerPath + '/' + route.url).replace(/\/+$/, ''),
                    preHandler: [...controllerMiddleware, ...routeMiddleware, ...paramValidationMiddleware],
                    async handler(request, reply): Promise<void> {
                        try {
                            const response = await controllerInstance[methodName](request, reply);
                            if (!route.customResponse && response instanceof Promise) {
                                return response
                                    .then((data: ResponseX) => sendResponse(reply, data))
                                    .catch((error) => {
                                        exceptionLog(error);
                                        reply.status(500).send(serverError(error));
                                    });
                            }
                            sendResponse(reply, response);
                        } catch (error) {
                            handleException(reply, error);
                        }
                    }
                };

                app.route(routeOptions);
            });
        });
    });
};

const sendResponse = (reply: ReplayX, response: ResponseX) => {
    const statusCode = response.code >= 200 && response.code < 1000 ? response.code : 200;
    reply.code(statusCode).send(response);
};

const handleException = (reply: ReplayX, error: any) => {
    if (error instanceof Exception) {
        const errorCode = error.statusCode >= 200 && error.statusCode < 1000 ? error.statusCode : 400;
        const response = error?.response ? error.response : serverError(error);
        reply.status(errorCode).send(response);
    } else {
        exceptionLog(error);
        reply.status(500).send(serverError(error));
    }
};

export { attachRouter };