import { FastifyInstance } from 'fastify';
import { GetMetaData, CustomRoute } from '../decorators';
import { serverError } from './apiResults';
import { ResponseX } from './types';

const attachRouter = (appRoutes: any[], instance: FastifyInstance) => {
    appRoutes.forEach((Controller) => {
        const controllerInstance: any = new Controller();
        const metaData = GetMetaData(controllerInstance);

        const { controllerMiddleware = [], controller: controllerPath, routes } = metaData;

        Object.keys(routes).forEach((methodName: string) => {
            const route: CustomRoute = routes[methodName];
            const paramValidationMiddleware: any = route?.sanitizeSchema ? [/* validateParams(route?.sanitizeSchema) */] : [];
            const { method: routeMethod, middleware: routeMiddleware = [] } = route;

            instance.route({
                
                method: routeMethod as 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head',
                url: controllerPath + route.url,
                preHandler: [...routeMiddleware, ...paramValidationMiddleware],
                handler: async (req, res) => {
                    try {
                        const response = await controllerInstance[methodName](req, res);

                        if (Object.prototype.hasOwnProperty.call(route, 'customResponse')) return null;
                        if (!(response instanceof Promise)) return res.send(response);

                        return response
                            .then((data: ResponseX) => {
                                if (data.status !== 'success') return res.code(400).send(data);
                                return res.send(data);
                            })
                            .catch((error: any) => {
                                res.status(500).send(serverError(error));
                            });
                    } catch (error) {
                        res.status(500).send(serverError(error));
                    }
                },
            });
        });
    });
};

export { attachRouter };
