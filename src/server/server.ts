import http, { Server as HttpServer, IncomingMessage, ServerResponse } from 'http';
import fastify, { FastifyInstance as AppInstance } from 'fastify';
import { App } from './app';
import { appConfig } from '~/config';
import { exceptionLog } from '~/utils';
import { sqlDbManager } from '~/database';

export class Server {
    private port: number;
    private server: HttpServer;
    private instance: AppInstance<HttpServer, IncomingMessage, ServerResponse>;

    constructor() {
        this.port = appConfig.app.port;

        this.instance = fastify<HttpServer>({
            serverFactory: this.serverFactory.bind(this),
            ...appConfig.server
        });
    }

    private serverFactory(handler: (req: IncomingMessage, res: ServerResponse) => void): HttpServer {
        this.server = http.createServer((req, res) => handler(req, res));
        return this.server;
    }

    public run() {
        this.instance.listen({ port: this.port });
        this.server.on('error', this.onError.bind(this));

        // Pass app instance
        new App(this.instance);
        this.server.on('listening', this.onListening.bind(this));

        // Graceful shutdown on process termination
        process.on('SIGTERM', () => this.shutdown());
        process.on('SIGINT', () => this.shutdown());
    }

    private onListening(): void {
        const addr = this.server.address();
        const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + this.port;
        console.info('Listening on ' + bind);
    }

    private onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') exceptionLog(error);
        const bind = typeof this.port === 'string' ? 'Pipe ' + this.port : 'Port ' + this.port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
            default:
                console.error('Unhandled server error:', error);
                process.exit(1);
        }
    }

    private async shutdown() {
        await sqlDbManager.closeConnections();

        console.info('Closing server...');

        this.server.close((err) => {
            if (err) {
                console.error('Error during server shutdown:', err);
                process.exit(1);
            } else {
                console.info('Server closed. Exiting process.');
                process.exit(0);
            }
        });
    }
}

const server = new Server();
server.run();