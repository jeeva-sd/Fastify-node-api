import { EmailService } from './email';
import { JobService } from './job';
export * from './axios';
export * from './SQL';

export const combinedService = [
    JobService, EmailService
];