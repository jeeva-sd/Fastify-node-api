import { Server } from './server';
export * from './types';

const server = new Server();
server.run();