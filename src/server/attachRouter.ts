import { FastifyInstance as AppInstance } from 'fastify';
import { Exception, GetMetaData, serverError, validatePayload } from '~/modules/shared';
import { ReplayX, ResponseX } from './types';
import { exceptionLog } from '~/utils';
import { appRoutes } from './routes';

const attachRouter = (app: AppInstance) => {
    appRoutes?.forEach((item) => {
        item.routes.forEach(Controller => {
            const controllerInstance = new Controller() as any;
            const metaData = GetMetaData(controllerInstance);

            const { controllerMiddleware = [], controller: controllerPath, routes } = metaData;

            Object.entries(routes).forEach(([methodName, route]) => {
                const paramValidationMiddleware = route?.sanitizeSchema ? [validatePayload(route?.sanitizeSchema)] : [];
                const { method: routeMethod, middleware: routeMiddleware = [] } = route;
                const urlPrefix = item?.prefix ? item?.prefix : '';

                app.route({
                    method: routeMethod,
                    url: ('/api/' + urlPrefix + '/' + controllerPath + '/' + route.url).replace(/\/+$/, ''),
                    preHandler: [...controllerMiddleware, ...routeMiddleware, ...paramValidationMiddleware],
                    async handler(request, reply): Promise<void> {
                        try {
                            const response = await controllerInstance[methodName](request, reply);

                            if (Object.prototype.hasOwnProperty.call(route, 'customResponse')) return;
                            if (!(response instanceof Promise)) return sendResponse(reply, response);

                            return response
                                .then((data: ResponseX) => sendResponse(reply, data))
                                .catch((error) => {
                                    exceptionLog(error);
                                    reply.status(500).send(serverError(error));
                                });
                        } catch (error) {
                            if (error instanceof Exception) {
                                const errorCode = error.statusCode >= 200 && error.statusCode < 1000 ? error.statusCode : 400;
                                const response = error?.response ? error.response : serverError(error);

                                reply.status(errorCode).send(response);
                            } else {
                                exceptionLog(error);
                                reply.status(500).send(serverError(error));
                            }
                        }
                    }
                });
            });
        });
    });
};

const sendResponse = (reply: ReplayX, response: ResponseX) => {
    const statusCode = response.code >= 200 && response.code < 1000 ? response.code : 200;
    return reply.code(statusCode).send(response);
};

export { attachRouter };