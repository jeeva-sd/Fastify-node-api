import { FastifyInstance as AppInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import { fastifyCookie } from '@fastify/cookie';

import { appControllers } from '~/controllers';
import { attachRouter } from './attachRouter';
import { exception, notFound, take } from '~/utils';
import { appConfig } from '~/config';

export class App {
    private app: AppInstance;

    constructor(appInstance: AppInstance) {
        this.app = appInstance;

        this.middlewareHandler();
        this.routeHandler();
        this.errorHandler();
    }

    private middlewareHandler(): void {
        this.app.register(fastifyCookie, appConfig.cookie);
        this.app.register(fastifyCors, appConfig.cors);
        this.app.register(fastifyStatic, appConfig.static);
    }

    private routeHandler(): void {
        this.app.get('/', (_request, reply) => {
            reply.send(take(200, {
                name: appConfig.app.name,
                environment: appConfig.app.environment
            }));
        });

        this.combineRoutes();
    }

    private combineRoutes() {
        attachRouter(this.app, appControllers, '/api/v1');
    }

    private errorHandler(): void {
        // Catch 404 and forward to error handler
        this.app.setNotFoundHandler((req, reply) => {
            reply.status(404).send(notFound(`${req.url} not found!`));
        });

        // Handle unexpected errors
        this.app.setErrorHandler((err, _req, reply) => {
            reply.status(err.statusCode || 500).send(exception(err));
        });

    }
}
