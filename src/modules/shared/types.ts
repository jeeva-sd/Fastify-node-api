export enum MessageStatus {
    success = 'success',
    failure = 'failure',
    error = 'error',
}

export interface Message {
    message: string;
    status: string;
    httpStatus?: number;
}

export interface Messages {
    [key: number]: Message;
}