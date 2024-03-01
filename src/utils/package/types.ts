import { FastifyCookieOptions } from '@fastify/cookie';
import { FastifyCorsOptions } from '@fastify/cors';
import { FastifyStaticOptions } from '@fastify/static';
import { FastifyRequest, FastifyReply } from 'fastify';

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

export interface CorsConfig extends FastifyCorsOptions { }
export interface CookieConfig extends FastifyCookieOptions { }
export interface StaticPathConfig extends FastifyStaticOptions { }