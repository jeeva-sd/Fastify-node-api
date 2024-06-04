import { AuthController } from './auth.controller';
import { UserController } from './user.controller';

export const v1Controllers = [
    AuthController,
    UserController,
];

export const combineRoutes = [{
    prefix: 'v1',
    routes: v1Controllers
}];

// Add classes for dependency injection
export const combinedControllers = [
    ...v1Controllers,
];