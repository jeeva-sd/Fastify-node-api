import { FastifyRequest, FastifyReply, FastifyServerOptions } from 'fastify';
import { FastifyCorsOptions } from '@fastify/cors';
import { FastifyStaticOptions } from '@fastify/static';
import { FastifyMultipartOptions } from '@fastify/multipart';
import { TokenData } from '~/api/v1/auth/entities/type';

export interface RequestX extends FastifyRequest {
  payload?: any;
  sanitized?: boolean;
  tokenData?: TokenData;
}

export interface ResponseX {
  version: string;
  status: string;
  code: number;
  message: string | null;
  data: unknown;
  options?: unknown;
  error?: unknown;
}

export interface ReplayX extends FastifyReply { }

export interface ServerConfig extends FastifyServerOptions { }
export interface CorsConfig extends FastifyCorsOptions { }
export interface StaticPathConfig extends FastifyStaticOptions { }
export interface FileUploadsConfig extends FastifyMultipartOptions { }
export interface ValidationConfig {
  abortEarly?: boolean;
  recursive?: boolean;
  stripUnknown?: boolean;
  context?: object;
  strict?: boolean;
}