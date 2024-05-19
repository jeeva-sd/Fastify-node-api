export function isObject(value: any): boolean {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isFunction(value: any): boolean {
    return typeof value === 'function';
}

export function isObjectEmpty(obj: object): boolean {
    return Object.keys(obj).length === 0;
}

export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export function sortByKey<T>(array: T[], key: keyof T, ascending: boolean = true): T[] {
    return array.slice().sort((a, b) => {
        const valueA = a[key];
        const valueB = b[key];
        if (valueA < valueB) return ascending ? -1 : 1;
        if (valueA > valueB) return ascending ? 1 : -1;
        return 0;
    });
}

export function chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

export function deepMerge<T>(...objects: T[]): T {
    const result = {} as T;
    for (const obj of objects) {
        for (const key in obj) {
            if (isObject(obj[key])) {
                result[key] = deepMerge(result[key], obj[key]);
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
}
