import { extractError } from '~/utils';
import { Result } from '../handlers';

// GUARD decorator for error handling in repository methods
export function RepoGuard(_target: Record<string, any>, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: Record<string, any>[]) {
        try {
            const result = await originalMethod.apply(this, args);
            const code = result?.code;
            const data = result?.data;
            const success = code ? false :
                Object.prototype.hasOwnProperty.call(result, 'success') ? result.success : true;

            return { success, data, error: null, code } as Result;
        } catch (err) {
            const error = extractError(err);
            console.error(`\nError in repository at '${propertyKey}':\n${error}`);
            return { success: false, data: null, error, code: 500 } as Result;
        }
    };

    return descriptor;
}