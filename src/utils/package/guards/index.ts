import { Output, extractErrorMessage, serverError } from "~/utils";

// GUARD decorator for error handling in core methods
export function CoreGuard(_target: Record<string, any>, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: Record<string, any>[]) {
        try {
            const result = await originalMethod.apply(this, args);
            return result;
        } catch (err) {
            const error = extractErrorMessage(err);
            console.error(`\nError in core at '${propertyKey}':\n${error}`);
            return serverError({ error });
        }
    };

    return descriptor;
};

// GUARD decorator for error handling in repository methods
export function RepoGuard(_target: Record<string, any>, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: Record<string, any>[]) {
        try {
            const result = await originalMethod.apply(this, args);
            const code = result?.code;
            const data = result?.data;
            const success = code ? false : result.hasOwnProperty('success') ? result.success : true;

            return { success, data, error: null, code } as Output;
        } catch (err) {
            const error = extractErrorMessage(err);
            console.error(`\nError in repository at '${propertyKey}':\n${error}`);
            return { success: false, data: null, error } as Output;
        }
    };

    return descriptor;
};