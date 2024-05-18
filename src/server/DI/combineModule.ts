import { AuthController } from "~/controllers/auth.controller";
import { UserController } from "~/controllers/user.controller";
import { AuthCore } from "~/core/auth";
import { UserCore } from "~/core/user";
import { AuthRepository } from "~/database/localDB/repository/auth.repository";
import { UserRepository } from "~/database/localDB/repository/user.repository";

export const combineModule = [
    AuthRepository,
    UserRepository,
    AuthCore,
    UserCore,
    AuthController,
    UserController,
]