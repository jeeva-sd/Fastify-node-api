import { FastifyRequest, FastifyReply, FastifyServerOptions } from 'fastify';
import { FastifyCorsOptions } from '@fastify/cors';
import { FastifyStaticOptions } from '@fastify/static';
import { FastifyMultipartOptions } from '@fastify/multipart';

export interface RequestX extends FastifyRequest {
  payload?: any;
  sanitized?: boolean;
  tokenData?: TokenData;
  formData?: any;
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

export interface TokenData {
  userId: number;
  roleId: number;
}

export interface UserData {
  userData: TokenData;
}
