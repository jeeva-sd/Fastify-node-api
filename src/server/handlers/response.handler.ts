import { ResponseX } from '~/server';
import { appConfig } from '~/config';
import { extractError } from '~/helpers';
import { actionMessages, MessageStatus } from '~/constants';

// Common function to build an ResponseX
const buildResponseX = (code: number, data?: any, options?: any): ResponseX => {
    const message = options?.message ? extractError(options?.message) : (actionMessages[code]?.message ?? null);
    const status = actionMessages[code]?.status ?? MessageStatus.success;
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