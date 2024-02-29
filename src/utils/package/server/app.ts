import { FastifyInstance as AppInstance } from 'fastify';
import fastifyStatic from '@fastify/static';
import cookie, { FastifyCookieOptions } from '@fastify/cookie';
import path from 'path';
import { appControllers } from '~/controllers';
import { exception, notFound, take } from '~/utils';
import { appConfig } from '~/config';
import { attachRouter } from './router';

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
            // Set CORS headers
            reply.header('Access-Control-Allow-Origin', '*');
            reply.header('Access-Control-Allow-Credentials', 'true');
            reply.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
            reply.header('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Key, Set-Cookie');

            // Handle preflight requests
            if (request.method === 'OPTIONS') {
                return reply.code(200).send();
            }

            done();
        });

        this.app.register(fastifyStatic, {
            root: path.join(__dirname, '../../../../public'),
            prefix: '/public/',
        });
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
            reply.status(500).send(exception(err));
        });
    }
}
