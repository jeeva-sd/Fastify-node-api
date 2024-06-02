import { EmailService } from './email';
import { JobService } from './job';

export * from './axios';
export * from './SQL';
export * from './job';

export const injectableServices = [
    JobService, EmailService
];