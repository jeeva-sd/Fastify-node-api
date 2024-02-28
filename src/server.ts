import http, { Server as HttpServer } from 'http';
import fastify, { FastifyInstance as AppInstance } from 'fastify';
import { App } from './app';
import { appConfig } from '~/config';

class Server {
    private port: number;
    private server: HttpServer;
    private instance: AppInstance<HttpServer>;

    private serverFactory(handler: (arg0: http.IncomingMessage, arg1: http.ServerResponse<http.IncomingMessage> & { req: http.IncomingMessage; }) => void): HttpServer {
        this.server = http.createServer((req, res) => handler(req, res));
        return this.server;
    }
    
    public run() {
        this.port = appConfig.app.port;
        const serverFactory = this.serverFactory.bind(this);

        this.instance = fastify({ serverFactory });
        this.instance.listen({ port: this.port });

        this.server.on('error', this.onError.bind(this));
        this.server.on('listening', this.onListening.bind(this));

        // Pass app instance
        new App(this.instance);

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
        if (error.syscall !== 'listen') throw error;
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
        console.info('Received termination signal. Closing server...');

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

// Usage
new Server().run();
