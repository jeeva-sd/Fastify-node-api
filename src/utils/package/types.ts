import { FastifyRequest, FastifyReply, FastifyServerOptions } from 'fastify';
import { FastifyCookieOptions } from '@fastify/cookie';
import { FastifyCorsOptions } from '@fastify/cors';
import { FastifyStaticOptions } from '@fastify/static';

export interface RequestX extends FastifyRequest {
  parameters?: any;
}

export interface ResponseX {
  version: string;
  statusType: string;
  statusCode: number;
  message: string | null;
  data: any;
  options?: any;
  error?: any;
}

export interface ReplayX extends FastifyReply, ResponseX { }

export interface ServerConfig extends FastifyServerOptions { }
export interface CorsConfig extends FastifyCorsOptions { }
export interface CookieConfig extends FastifyCookieOptions { }
export interface StaticPathConfig extends FastifyStaticOptions { }