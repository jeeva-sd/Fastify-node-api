import { FastifyInstance } from 'fastify';
import { validateParams } from '~/middlewares';
import { ReplayX, RequestX, ResponseX } from '../types';
import { GetMetaData } from '../io/request';
import { CustomRoute } from '../io/types';
import { serverError } from '../io/response';

const attachRouter = (appRoutes: any[], instance: FastifyInstance) => {
    appRoutes.forEach((Controller) => {
        const controllerInstance = new Controller();
        const metaData = GetMetaData(controllerInstance);

        const { controllerMiddleware = [], controller: controllerPath, routes } = metaData;

        Object.keys(routes).forEach((methodName: string) => {
            const route: CustomRoute = routes[methodName];
            const paramValidationMiddleware = route?.sanitizeSchema ? [validateParams(route?.sanitizeSchema)] : [];
            const { method: routeMethod, middleware: routeMiddleware = [] } = route;

            instance.route({
                method: routeMethod ,
                url: controllerPath + route.url,
                preHandler: [...routeMiddleware, ...paramValidationMiddleware],
                handler: async (request: RequestX, replay: ReplayX) => {
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
