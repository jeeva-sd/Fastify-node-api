export * from './auth.repository';
export * from './user.repository';

import { AuthRepository } from './auth.repository';
import { UserRepository } from './user.repository';

// Add classes for dependency injection
export const injectableRepos = [
    AuthRepository,
    UserRepository,
];