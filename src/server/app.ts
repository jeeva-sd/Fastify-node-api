import 'reflect-metadata';
import fastify, { FastifyInstance as AppInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import fastifyMultipart from '@fastify/multipart';

import { appConfig } from '~/config';
import { notFound, take, attachRouter } from './handlers';
import container from './DI/dependencyContainer';
import { AuthController } from '~/controllers/auth.controller';

export class App {
    private app: AppInstance;

    constructor(appInstance: AppInstance) {
        this.app = appInstance;

        this.middlewareHandler();
        this.routeHandler();
        this.errorHandler();
    }

    private middlewareHandler(): void {
        this.app.register(fastifyCors, appConfig.cors);
        this.app.register(fastifyStatic, appConfig.static);
        this.app.register(fastifyMultipart, appConfig.uploads);
    }

    private routeHandler(): void {
        this.app.get('/', (_request, reply) => {
            reply.send(take(200, {
                name: appConfig.app.name,
                environment: appConfig.app.environment
            }));
        });

        attachRouter(this.app);
    }

    // private routeHandler(): void {
    //     const userControllera: AuthController = container.get<AuthController>(AuthController.name);
    //     const userController: UserController = container.get<UserController>(UserController.name);
    //     console.log(userController, 'userController in app');
    //     console.log(userControllera, 'authController in app');

    //     // Define your routes
    //     this.app.get('/users', async (request, reply) => {
    //         const a = await userControllera.login(request);
    //         // const a = await userController.getUserList();
    //         reply.send(a);
    //     });
    // }
    

    private errorHandler(): void {
        // Catch 404 and forward to error handler
        this.app.setNotFoundHandler((req, reply) => {
            reply.status(404).send(notFound(`${req.url} not found!`));
        });

        // Handle unexpected errors
        this.app.setErrorHandler((err, _req, reply) => {
            const statusCode = err.statusCode || 500;
            const errorMessage = err.message || 'Internal Server Error';
            reply.status(statusCode).send({ message: errorMessage });
        });
    }
}