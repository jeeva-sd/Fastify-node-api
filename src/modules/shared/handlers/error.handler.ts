import { ResponseX } from "~/server";
import { take } from "./response.handler";

export class Exception extends Error {
    statusCode: number;
    errorCode: string;
    response: ResponseX | null;

    constructor(statusCode: number | null, message?: string) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode || 400;

        this.response = take(this.statusCode);
        if (message) this.response.message = message;

        Error.captureStackTrace(this, this.constructor);
    }
}

