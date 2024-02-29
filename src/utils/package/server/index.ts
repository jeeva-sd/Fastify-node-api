import { FastifyServerOptions } from 'fastify';
import { Server } from './server';

const serverConfig: FastifyServerOptions = {
    onProtoPoisoning: 'remove', // Prevent prototype pollution attacks
    onConstructorPoisoning: 'remove', // Prevent constructor injection attacks
    logger: {
        level: 'warn',
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    },
};

// Usage
new Server(serverConfig).run();