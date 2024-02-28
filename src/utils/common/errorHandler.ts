export function extractErrorMessage(error: any): string | null {
    if (typeof error === 'string') return error;
    else if (Array.isArray(error)) {
        if (error?.length === 0) return null;
        return error[0];
    }
    else if (error instanceof Error) return error.message;
    else if (typeof error === 'object') {
        const errorMessage = error.message || (error.error && error.error.message);

        if (errorMessage) return errorMessage;
        return error.toString?.();
    }
    else return error?.toString?.() || null;
}

export function exceptionLog(error: any) {
    const err = extractErrorMessage(error);
    console.error(err);
    return err;
}