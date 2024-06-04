export function capitalizeWords(str: string): string {
    if (!str) return '';
    return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

export function toTitleCase(str: string): string {
    if (!str) return '';
    return str.toLowerCase().replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^\w/, c => c.toUpperCase());
}

export function toCamelCase(str: string): string {
    if (!str) return '';
    return str.replace(/\s(.)/g, (_, char) => char.toUpperCase());
}

export function truncate(str: string, maxLength: number): string {
    if (!str || maxLength <= 0) return '';
    return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
}

export function isEmptyString(str: string): boolean {
    return !str || str.trim().length === 0;
}

export function removeWhitespace(str: string): string {
    if (!str) return '';
    return str.replace(/\s/g, '');
}

export function countWords(str: string): number {
    if (!str) return 0;
    const words = str.split(/\s+/).filter(word => word.length > 0);
    return words.length;
}

export function isEmail(str: string): boolean {
    if (!str) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

export function slugify(str: string): string {
    if (!str) return '';
    return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export const getRandomString = (length: number): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
};