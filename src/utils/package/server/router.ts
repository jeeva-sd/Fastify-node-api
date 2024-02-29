import { FastifyInstance as AppInstance } from 'fastify';
import { GetMetaData, serverError } from '../io';
import { validateParams } from '~/middlewares';
import { ReplayX, RequestX, ResponseX } from '../types';

const attachRouter = (app: AppInstance, appRoutes: any[], prefix?: string) => {
    appRoutes.forEach((Controller) => {
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
                async handler(request: RequestX, replay: ReplayX) {
                    try {
                        const response = await controllerInstance[methodName](request, replay);

                        if (Object.prototype.hasOwnProperty.call(route, 'customResponse')) return null;
                        if (!(response instanceof Promise)) return replay.send(response);

                        return response
                            .then((data: ResponseX) => {
                                if (data.statusType !== 'success') return replay.code(400).send(data);
                                return replay.send(data);
                            })
                            .catch((error) => {
                                replay.status(500).send(serverError(error));
                            });
                    } catch (error) {
                        replay.status(500).send(serverError(error));
                    }
                },
            });
        });
    });
};

export { attachRouter };
