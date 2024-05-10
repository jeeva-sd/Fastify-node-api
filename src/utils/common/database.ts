import { sql } from 'drizzle-orm';
import { extractError } from './exception';
import { log } from './helper';

export const selectCount = { count: sql`count(*)`.mapWith(Number) };

export function getCount(data: unknown): number {
    if (!Array.isArray(data)) return 0;
    return data[0].count;
}

export function getInsertId(result: unknown) {
    try {
        if (result && result instanceof Array && result.length > 0 && result[0].hasOwnProperty('insertId')) {
            return result[0].insertId;
        }

        return 0;
    } catch (error) {
        log(extractError(error));
        return 0;
    }
}

export function getAffectedRows(result: unknown) {
    try {
        if (result && result instanceof Array && result.length > 0 && result[0].hasOwnProperty('affectedRows')) {
            return result[0].affectedRows;
        }

        return 0;
    } catch (error) {
        log(extractError(error));
        return 0;
    }
}