import { ResponseX } from '~/server';
import { appConfig } from '~/config';
import {  extractError } from '~/utils';
import { messageObj } from '../message';
import { MessageStatus } from '../types';
import { Result } from './type';

// Common function to build an ResponseX
const buildResponseX = (code: number, data?: any, options?: any): ResponseX => {
    const message = options?.message ? extractError(options?.message) : (messageObj[code]?.message ?? null);
    const status = messageObj[code]?.status ?? MessageStatus.success;
    const error = options?.error ? extractError(options?.error) : null;

    return {
        version: appConfig.app.version,
        code,
        status,
        message,
        data: data || null,
        error
    };
};

// specific code
export const take = (code = 200, res?: any, options?: any): ResponseX => {
    const data = res?.data ?? res;
    return buildResponseX(code, data, options);
};

// exception
export const exception = (error?: any, data?: any): ResponseX => {
    return buildResponseX(1004, data, { message: error });
};

// forbidden request
export const forbidden = (error?: any): ResponseX => {
    return buildResponseX(403, null, { error });
};

// client error
export const clientError = (error?: any): ResponseX => {
    return buildResponseX(400, null, { message: error, error: 'Validation error' });
};

// server error
export const serverError = (errorObj?: any): ResponseX => {
    const error = errorObj?.error ?? null;
    const code = errorObj?.code ?? 500;
    const message = errorObj?.message ?? null;

    return buildResponseX(code, null, { error, message });
};

// not found
export const notFound = (error?: any): ResponseX => {
    return buildResponseX(404, null, { error });
};

export const repoError = (response: Result): ResponseX => {
    const code = response?.code || 500;
    const error = response?.error || null;
    const message = response?.message || null;
    return buildResponseX(code, null, { error, message });
};

export const dataFound = (res: any): ResponseX => {
    const data = res.data ?? res;
    return buildResponseX(1000, data);
};

export const dataNotFound = (res: any = []): ResponseX => {
    const data = res.data ?? res;
    return buildResponseX(1001, data);
};

export const dataList = (data: any): ResponseX => {
    if (!data) return dataNotFound();
    else if (Array.isArray(data) && data.length > 0) return dataFound(data);
    else if (typeof data === 'object' && Object.keys(data).length > 0) return dataFound(data);
    else return dataNotFound();
};