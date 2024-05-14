import * as bcrypt from 'bcrypt';
import { dataList, take, Exception } from '~/server';
import { appConfig } from '~/config';
import { repositories } from '~/database';
import { UserRepository } from '~/database/localDB/repository/user.repository';
import {
    CreateUserPayload, DeleteUserPayload, UpdateUserPayload,
    UserListPayload
} from '~/rules';

class UserCore {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = repositories.userRepository;
    }

    public async getUserList(payload: UserListPayload) {
        const userList = await this.userRepository.findManyUsers(payload);
        if (!userList.totalRecords) throw new Exception(404);
        return dataList(userList);
    }

    public async createUser(payload: CreateUserPayload) {
        const userData = {
            ...payload,
            password: await bcrypt.hash(payload.password, appConfig.bcrypt.saltRounds),
        };

        const createUser = await this.userRepository.insertUser(userData);
        return take(1200, createUser);
    }

    public async updateUser(payload: UpdateUserPayload) {
        const updateUser = await this.userRepository.updateUser(payload);
        return take(1201, updateUser);
    }

    public async deleteUser(payload: DeleteUserPayload) {
        const deleteUser = await this.userRepository.deleteUser(payload.id);
        return take(1202, deleteUser);
    }
}

export { UserCore };