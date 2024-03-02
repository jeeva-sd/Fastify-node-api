export const log = (value: any): void => {
    console.log(value);
};

export const wait = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const randomString = (length: number): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
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
