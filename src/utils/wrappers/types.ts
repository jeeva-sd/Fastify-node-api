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