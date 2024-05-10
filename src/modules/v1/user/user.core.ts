import * as bcrypt from 'bcrypt';
import { ResponseX } from '~/server';
import { CoreGuard, dataList, repoError, take } from '~/modules/shared';
import { appConfig } from '~/config';
import { CreateUserPayload, DeleteUserPayload, UpdateUserPayload, UserListPayload } from './entities/type';
import { UserRepository } from './user.repository';

class UserCore {
    private authRepository: UserRepository;

    @CoreGuard
    public async getUserList(userListPayload: UserListPayload): Promise<ResponseX> {
        const userList = await this.repoInstance().findManyUsers(userListPayload);
        if (!userList.success) return repoError(userList);

        return dataList(userList.data);
    }

    @CoreGuard
    public async createUser(payload: CreateUserPayload): Promise<ResponseX> {
        const userData = {
            ...payload,
            password: await bcrypt.hash(payload.password, appConfig.bcrypt.saltRounds),
        };

        const createUser = await this.repoInstance().insertUser(userData);
        if (!createUser.success) return repoError(createUser);

        return take(1200, createUser.data);
    }

    @CoreGuard
    public async updateUser(payload: UpdateUserPayload): Promise<ResponseX> {
        const updateUser = await this.repoInstance().updateUser(payload);
        if (!updateUser.success) return repoError(updateUser);

        return take(1201, updateUser.data);
    }

    @CoreGuard
    public async deleteUser(payload: DeleteUserPayload): Promise<ResponseX> {
        const deleteUser = await this.repoInstance().deleteUser(payload.id);
        if (!deleteUser.success) return repoError(deleteUser);

        return take(1202, deleteUser.data);
    }

    private repoInstance(): UserRepository {
        if (!this.authRepository) this.authRepository = new UserRepository();
        return this.authRepository;
    }
}

export { UserCore };