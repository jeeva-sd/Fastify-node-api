import { Controller, Sanitize, Post, Patch, Apply, Get, Delete, RequestX, ResponseX } from '~/server';
import { createUserPayload, updateUserPayload, userListPayload } from '../interceptors/payloadSchema/user.payload';
import { adminAuth, tokenAuth } from '~/interceptors/auth.middleware';
import { UserCore } from '~/core/user';

@Controller('user', [tokenAuth])
class UserController {
    private core: UserCore;

    @Get()
    @Apply(adminAuth)
    @Sanitize(userListPayload)
    public userList(req: RequestX): Promise<ResponseX> {
        return this.userCore().getUserList(req.payload);
    }

    @Post()
    @Sanitize(createUserPayload)
    @Apply(adminAuth)
    public createUser(req: RequestX): Promise<ResponseX> {
        return this.userCore().createUser(req.payload);
    }

    @Patch()
    @Apply(adminAuth)
    @Sanitize(updateUserPayload)
    public updateUser(req: RequestX): Promise<ResponseX> {
        return this.userCore().updateUser(req.payload);
    }

    @Delete(':id/delete')
    @Apply(adminAuth)
    @Sanitize(updateUserPayload)
    public deleteUser(req: RequestX): Promise<ResponseX> {
        return this.userCore().deleteUser(req.payload);
    }

    private userCore(): UserCore {
        if (!this.core) this.core = new UserCore();
        return this.core;
    }
}

export { UserController };