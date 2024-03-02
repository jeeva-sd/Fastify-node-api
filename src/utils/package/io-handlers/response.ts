import { ResponseX, extractErrorMessage } from '~/utils';
import { appConfig } from '~/config';
import { messageObj, MessageStatus } from '~/entities';
import { Output } from './types';

// Common function to build an ResponseX
const buildResponseX = (code: number, data?: any, options?: any): ResponseX => {
    const message = options?.message ? extractErrorMessage(options?.message) : (messageObj[code]?.message ?? null);
    const status = messageObj[code]?.status ?? MessageStatus.success;
    const error = options?.error ? extractErrorMessage(options?.error) : null;

    return {
        version: appConfig.app.version,
        statusCode: code,
        statusType: status,
        message,
        data: data || null,
        error
    };
};

// specific code
export const take = (code: number, res?: any, options?: any): ResponseX => {
    const data = res?.data ?? res;
    return buildResponseX(code, data, options);
};

// successful operation
export const success = (data?: any): ResponseX => {
    return buildResponseX(200, data);
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
    return buildResponseX(400, null, { message: error });
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

// Helper functions for common responses
export const dataFound = (res: any): ResponseX => {
    const data = res.data ?? res;
    return buildResponseX(1000, data);
};

export const repoError = (response: Output): ResponseX => {
    const code = response?.code || 400;
    const error = response?.error || null;
    const message = response?.message || null;
    return buildResponseX(code, null, { error, message });
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