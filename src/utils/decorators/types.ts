// import { NextFunction, Response } from 'express';
import { RequestX } from '../wrappers';

export interface MetaData {
    controller: string;
    controllerMiddleware: any;
    routes: {
        [key: string]: CustomRoute;
    };
}

export interface CustomRoute {
    method: string;
    url: string;
    middleware?: any;
    customResponse?: boolean;
    sanitizeSchema: null | any;
}

export interface TargetData {
    meta_data?: MetaData;
}

export type MiddlewareFunction = (req: RequestX, res: Response) => void;

export type ClassPrototype = Record<string, any>;

export type RepoResult<T = any> = {
    success?: boolean;
    data?: T;
    error?: any;
    code?: number;
};