import * as bcrypt from 'bcrypt';
import { dataList, take, Exception } from '~/server';
import { appConfig } from '~/config';
import {
    CreateUserPayload, DeleteUserPayload, UpdateUserPayload,
    UserListPayload
} from '~/rules';
import { Injectable } from '~/server/inj';
import { UserRepository } from '~/database';

@Injectable()
class UserCore {
    constructor(private userRepository: UserRepository) { }

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