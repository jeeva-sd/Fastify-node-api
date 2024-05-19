import { randomUUID } from 'crypto';

export const log = (value: any): void => {
    console.log(value);
};

export const wait = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const parseJSON = (str: string): any => {
    try {
        return JSON.parse(str);
    } catch {
        return null;
    }
};

export const groupBy = (key: string) => (array: any[]) => {
    const result = array.reduce((obj: any, item: any) => {
        const value = item[key];
        obj[value] = (obj[value] || []).concat(item);
        return obj;
    }, {});

    return result;
};

export const objectById = (key: string) => (array: any[]) => {
    const result = array.reduce((obj: any, item: any) => {
        const value = item[key];
        obj[value] = item;
        return obj;
    }, {});

    return result;
};

export function generateFilename(originalFilename: string): string {
    const uuid = randomUUID();
    const extension = originalFilename.split('.').pop();
    const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace('T', '-').replace(/\..+/, '');

    return `${timestamp}-${uuid}.${extension}`;
}