export * from './auth.repository';
export * from './user.repository';

import { AuthRepository } from './auth.repository';
import { UserRepository } from './user.repository';

export const combinedRepo = [
    AuthRepository,
    UserRepository,
];