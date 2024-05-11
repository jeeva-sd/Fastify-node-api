import * as bcrypt from 'bcrypt';
import { dataList, take, ResponseX } from '~/server';
import { appConfig } from '~/config';
import { UserRepository } from './user.repository';
import { CreateUserPayload, DeleteUserPayload, UpdateUserPayload, UserListPayload } from './user.type';

class UserCore {
    private userRepository: UserRepository;

    public async getUserList(userListPayload: UserListPayload): Promise<ResponseX> {
        const userList = await this.userRepo().findManyUsers(userListPayload);
        return dataList(userList);
    }

    public async createUser(payload: CreateUserPayload): Promise<ResponseX> {
        const userData = {
            ...payload,
            password: await bcrypt.hash(payload.password, appConfig.bcrypt.saltRounds),
        };

        const createUser = await this.userRepo().insertUser(userData);
        return take(1200, createUser);
    }

    public async updateUser(payload: UpdateUserPayload): Promise<ResponseX> {
        const updateUser = await this.userRepo().updateUser(payload);
        return take(1201, updateUser);
    }

    public async deleteUser(payload: DeleteUserPayload): Promise<ResponseX> {
        const deleteUser = await this.userRepo().deleteUser(payload.id);
        return take(1202, deleteUser);
    }

    private userRepo(): UserRepository {
        if (!this.userRepository) this.userRepository = new UserRepository();
        return this.userRepository;
    }
}

export { UserCore };