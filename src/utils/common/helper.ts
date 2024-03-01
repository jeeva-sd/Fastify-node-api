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
