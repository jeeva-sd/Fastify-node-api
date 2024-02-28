import { FastifyInstance as AppInstance } from 'fastify';
import path from 'path';
import { appConfig } from './config';
import { exception, notFound, take, attachRouter } from '~/utils';
import type { FastifyCookieOptions } from '@fastify/cookie';
import cookie from '@fastify/cookie';
import fastifyStatic from '@fastify/static';
import { appControllers } from './controllers';

export class App {
    private app: AppInstance;

    constructor(appInstance: AppInstance) {
        this.app = appInstance;

        this.middlewareHandler();
        this.routeHandler();
        this.errorHandler();
    }

    private middlewareHandler(): void {
        const cookieOptions: FastifyCookieOptions = { secret: 'my-secret', parseOptions: {} };
        this.app.register(cookie, cookieOptions);

        this.app.addHook('preHandler', (request, reply, done) => {
            request.headers['access-control-allow-origin'] = '*';
            request.headers['access-control-allow-credentials'] = 'true';
            request.headers['access-control-allow-methods'] = 'GET, PUT, POST, DELETE, OPTIONS';
            request.headers['access-control-allow-headers'] = 'Content-Type, Accept, X-Key, Set-Cookie';

            // Handle preflight requests
            if (request.method === 'OPTIONS') {
                return reply.code(200).send();
            }

            done();
        });

        this.app.register(fastifyStatic, {
            root: path.join(__dirname, '../public'),
            prefix: '/public/',
        });
    }

    private routeHandler(): void {
        this.app.register((instance, _opts, done) => {
            instance.get('/', (_request, reply) => {
                reply.send(take(200, {
                    name: appConfig.app.name,
                    environment: appConfig.app.environment
                }));
            });

            this.combineRoutes(instance);
            done();
        });
    }

    private combineRoutes(instance: AppInstance) {
        attachRouter(appControllers, instance);
    }

    private errorHandler(): void {
        // catch 404 and forward to error handler
        this.app.setNotFoundHandler((req, reply) => {
            reply.status(404).send(notFound(`${req.url} not found!`));
        });

        // handle unexpected errors
        this.app.setErrorHandler((err, _req, reply) => {
            reply.status(500).send(exception(err));
        });
    }
}
