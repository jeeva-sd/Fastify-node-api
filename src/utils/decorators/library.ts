import { GetMetaData } from './prototype';
import * as yup from 'yup';
import { serverError } from '../wrappers';
import { extractErrorMessage } from '../common';
import { ClassPrototype, RepoResult, MiddlewareFunction, RouteMethod } from './types';

// Controller decorator
export const Controller = (controller: string, middleware?: MiddlewareFunction[]): ClassDecorator => {
  return (target: ClassPrototype) => {
    const meta = GetMetaData(target.prototype);
    meta.controller = controller;
    meta.controllerMiddleware = middleware || [];
  };
};

// Custom response decorator for handling responses
export const CustomResponse = (target: ClassPrototype, methodName: string, descriptor: PropertyDescriptor) => {
  const meta = GetMetaData(target);
  meta.routes[methodName] = { ...meta.routes[methodName], customResponse: true };
  return descriptor;
};

// HTTP method decorators for common methods
export const Get = (path: string) => setRoutes('get', path);
export const Post = (path: string) => setRoutes('post', path);
export const Patch = (path: string) => setRoutes('patch', path);
export const Put = (path: string) => setRoutes('put', path);
export const Delete = (path: string) => setRoutes('delete', path);

export const setRoutes = (method: RouteMethod, path: string): MethodDecorator => {
  return (target: ClassPrototype, methodName: string, descriptor: PropertyDescriptor) => {
    const meta = GetMetaData(target);
    meta.routes[methodName] = { ...meta.routes[methodName], method, url: path };
    return descriptor;
  };
};

// Middleware decorator
export const Apply = (routeMiddleware: MiddlewareFunction | MiddlewareFunction[]) => {
  return (target: ClassPrototype, methodName: string, descriptor: PropertyDescriptor) => {
    const meta = GetMetaData(target);
    const middleware = Array.isArray(routeMiddleware) ? routeMiddleware : [routeMiddleware];
    meta.routes[methodName] = { ...meta.routes[methodName], middleware };
    return descriptor;
  };
};

// Schema decorator
export const Sanitize = (schema: yup.Schema<any>) => {
  return (target: ClassPrototype, methodName: string, descriptor: PropertyDescriptor) => {
    const meta = GetMetaData(target);
    meta.routes[methodName] = { ...meta.routes[methodName], sanitizeSchema: schema };
    return descriptor;
  };
};

// GUARD decorator for error handling in core methods
export function CoreGuard(_target: ClassPrototype, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: ClassPrototype[]) {
    try {
      const result = await originalMethod.apply(this, args);
      return result;
    } catch (err) {
      const error = extractErrorMessage(err);
      console.error(`\nError in core at '${propertyKey}':\n${error}`);
      return serverError({ error });
    }
  };

  return descriptor;
};

// GUARD decorator for error handling in repository methods
export function RepoGuard(_target: ClassPrototype, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: ClassPrototype[]) {
    try {
      const result = await originalMethod.apply(this, args);
      const code = result?.code;
      const data = result?.data;
      const success = code ? false : result.hasOwnProperty('success') ? result.success : true;

      return { success, data, error: null, code } as RepoResult;
    } catch (err) {
      const error = extractErrorMessage(err);
      console.error(`\nError in repository at '${propertyKey}':\n${error}`);
      return { success: false, data: null, error } as RepoResult;
    }
  };

  return descriptor;
};