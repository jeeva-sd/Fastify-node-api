import { extractError } from '~/utils';
import { serverError } from '../handlers';

// Define a type for the method signature
type CoreMethod = (...args: unknown[]) => Promise<unknown>;

// GUARD decorator for error handling in core methods
export function CoreGuard(
    _target: Record<string, any>,
    propertyKey: string,
    descriptor: PropertyDescriptor
): PropertyDescriptor {
    const originalMethod: CoreMethod = descriptor.value as CoreMethod;

    descriptor.value = async function (...args: unknown[]): Promise<unknown> {
        try {
            const result = await originalMethod.apply(this, args);
            return result;
        } catch (err) {
            const error = extractError(err);
            console.error(`\nError in core at '${propertyKey}':\n${error}`);
            return serverError({ message: error, error: `Error at '${propertyKey}'` });
        }
    };

    return descriptor;
}
