export function extractError(error: any): string | null {
    if (typeof error === 'string') return error;
    if (Array.isArray(error)) return error.length > 0 ? error[0] : null;
    if (error instanceof Error) return error.message;
    if (typeof error === 'object') {
        const errorMessage = error.message || (error.error && error.error.message);
        if (errorMessage) return errorMessage;
        if (error.response && error.response.data && error.response.data.message) {
            return error.response.data.message;
        }
        return error.toString?.();
    }
    return error?.toString?.() || null;
}

export function exceptionLog(error: any) {
    const err = extractError(error);
    console.error(err);
    return err;
}