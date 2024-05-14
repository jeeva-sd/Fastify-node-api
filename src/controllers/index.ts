import { AuthController } from './auth.controller';
import { UserController } from './user.controller';

const v1Controllers = [
    AuthController,
    UserController,
];

export const routes = [{
    prefix: 'v1',
    routes: v1Controllers
}];