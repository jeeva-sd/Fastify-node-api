import path from 'path';
import { FastifyInstance as AppInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import { fastifyCookie } from '@fastify/cookie';

import { appControllers } from '~/controllers';
import { ReplayX, RequestX, exception, notFound, take } from '~/utils';
import { appConfig } from '~/config';
import { attachRouter } from './attachRouter';

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
        this.app.get('/', (_request: RequestX, reply: ReplayX) => {
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
        this.app.setNotFoundHandler((req: RequestX, reply: ReplayX) => {
            reply.status(404).send(notFound(`${req.url} not found!`));
        });

        // Handle unexpected errors
        this.app.setErrorHandler((err, _req: RequestX, reply: ReplayX) => {
            reply.status(500).send(exception(err));
        });
    }
}
