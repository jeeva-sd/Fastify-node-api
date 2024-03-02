import { RequestX } from '~/utils';

export type MiddlewareFunction = (req: RequestX, res: Response) => void;

export type MethodDecoratorType = (target: Record<string, any>, methodName: string | symbol, descriptor: PropertyDescriptor) => PropertyDescriptor;

export interface TargetData {
    meta_data?: MetaData;
}

export interface MetaData {
    controller: string;
    controllerMiddleware: any;
    routes: {
        [key: string]: CustomRoute;
    };
}

export type Output<T = any> = {
    success?: boolean;
    data?: T;
    error?: any;
    code?: number;
    message?: string;
};

export type RouteMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';

export interface CustomRoute {
    method: RouteMethod;
    url: string;
    middleware?: any;
    customResponse?: boolean;
    sanitizeSchema: null | any;
}

