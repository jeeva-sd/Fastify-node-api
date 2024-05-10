import { FastifyInstance as AppInstance } from 'fastify';
import { GetMetaData, serverError, validateParams } from '~/modules/shared';
import { ReplayX, ResponseX } from './types';
import { appRoutes } from './routes';

const attachRouter = (app: AppInstance) => {
    appRoutes?.forEach((item) => {
        item.routes.forEach(Controller => {
            const controllerInstance = new Controller() as any;
            const metaData = GetMetaData(controllerInstance);

            const { controllerMiddleware = [], controller: controllerPath, routes } = metaData;

            Object.entries(routes).forEach(([methodName, route]) => {
                const paramValidationMiddleware = route?.sanitizeSchema ? [validateParams(route?.sanitizeSchema)] : [];
                const { method: routeMethod, middleware: routeMiddleware = [] } = route;
                const urlPrefix = item?.prefix ? item?.prefix : '';

                app.route({
                    method: routeMethod,
                    url: ('/modules/' + urlPrefix + '/' + controllerPath + '/' + route.url).replace(/\/+$/, ''),
                    preHandler: [...controllerMiddleware, ...routeMiddleware, ...paramValidationMiddleware],
                    async handler(request, reply): Promise<void> {
                        try {
                            const response = await controllerInstance[methodName](request, reply);

                            if (Object.prototype.hasOwnProperty.call(route, 'customResponse')) return;
                            if (!(response instanceof Promise)) return sendResponse(reply, response);

                            return response
                                .then((data: ResponseX) => sendResponse(reply, data))
                                .catch((error) => reply.status(500).send(serverError(error)));
                        } catch (error) {
                            reply.status(500).send(serverError(error));
                        }
                    }
                });
            });
        });

    });
};

const sendResponse = (reply: ReplayX, response: ResponseX) => {
    const statusCode = response.status === 'success' ? 200 : 400;
    return reply.code(statusCode).send(response);
};

export { attachRouter };