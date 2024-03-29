import { FastifyInstance as AppInstance } from 'fastify';
import { GetMetaData, serverError, ReplayX, RequestX, ResponseX } from '~/utils';
import { validateParams } from '~/middlewares';

const attachRouter = (app: AppInstance, appRoutes: any[], prefix?: string) => {
    appRoutes?.forEach((Controller) => {
        const controllerInstance = new Controller();
        const metaData = GetMetaData(controllerInstance);

        const { controllerMiddleware = [], controller: controllerPath, routes } = metaData;

        Object.entries(routes).forEach(([methodName, route]) => {
            const paramValidationMiddleware = route?.sanitizeSchema ? [validateParams(route?.sanitizeSchema)] : [];
            const { method: routeMethod, middleware: routeMiddleware = [] } = route;
            const urlPrefix = prefix ? prefix : '';

            app.route({
                method: routeMethod,
                url: urlPrefix + controllerPath + route.url,
                preHandler: [...controllerMiddleware, ...routeMiddleware, ...paramValidationMiddleware],
                async handler(request, reply): Promise<void> {
                    try {
                        const response = await controllerInstance[methodName](request, reply);

                        if (Object.prototype.hasOwnProperty.call(route, 'customResponse')) return;
                        if (!(response instanceof Promise)) {
                            return sendResponse(reply, response);
                        }

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
};

const sendResponse = (reply: any, response: any) => {
    const statusCode = response.statusType === 'success' ? 200 : response.statusType === 'error' ? 400 : response.statusCode > 100 && response.statusCode < 1000 ? response.statusCode : 200;
    return reply.code(statusCode).send(response);
};

export { attachRouter };
