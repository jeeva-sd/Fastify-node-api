import * as yup from 'yup';
import { MetaData, MiddlewareFunction, RouteMethod, TargetData } from './types';

// App meta-data
export function GetMetaData(target: TargetData): MetaData {
    if (!target.meta_data) {
        target.meta_data = {
            controller: '',
            controllerMiddleware: [],
            routes: {},
        };
    }

    return target.meta_data;
}

// Custom response decorator for handling responses
export const CustomResponse = (target: Record<string, any>, methodName: string, descriptor: PropertyDescriptor) => {
    const meta = GetMetaData(target);
    meta.routes[methodName] = { ...meta.routes[methodName], customResponse: true };
    return descriptor;
};

// Controller decorator
export const Controller = (controller: string, middleware?: MiddlewareFunction[]): ClassDecorator => {
    return (target: Record<string, any>) => {
        const meta = GetMetaData(target.prototype);
        meta.controller = controller;
        meta.controllerMiddleware = middleware || [];
    };
};

// Decorator for setting routes
export const setRoutes = (method: RouteMethod, path: string): MethodDecorator => {
    return (target: Record<string, any>, methodName: string, descriptor: PropertyDescriptor) => {
        const meta = GetMetaData(target);
        meta.routes[methodName] = { ...meta.routes[methodName], method, url: path };
        return descriptor;
    };
};

// HTTP method decorators for common methods
export const Get = (path: string) => setRoutes('get', path);
export const Post = (path: string) => setRoutes('post', path);
export const Patch = (path: string) => setRoutes('patch', path);
export const Put = (path: string) => setRoutes('put', path);
export const Delete = (path: string) => setRoutes('delete', path);

// Middleware decorator
export const Apply = (routeMiddleware: MiddlewareFunction | MiddlewareFunction[]) => {
    return (target: Record<string, any>, methodName: string, descriptor: PropertyDescriptor) => {
        const meta = GetMetaData(target);
        const middleware = Array.isArray(routeMiddleware) ? routeMiddleware : [routeMiddleware];
        meta.routes[methodName] = { ...meta.routes[methodName], middleware };
        return descriptor;
    };
};

// Schema decorator
export const Sanitize = (schema: yup.Schema<any>) => {
    return (target: Record<string, any>, methodName: string, descriptor: PropertyDescriptor) => {
        const meta = GetMetaData(target);
        meta.routes[methodName] = { ...meta.routes[methodName], sanitizeSchema: schema };
        return descriptor;
    };
};
