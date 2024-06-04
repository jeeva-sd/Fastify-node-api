import { AuthCore } from './auth';
import { UserCore } from './user';

// Add classes for dependency injection
export const injectableCores = [
    AuthCore,
    UserCore,
];