import { Controller, Sanitize, Post, Patch, Apply, Get, Delete, RequestX, ResponseX } from '~/server';
import { adminAuth, tokenAuth } from '~/middlewares';
import { UserCore } from '~/core/user';
import { createUserRule, updateUserRule, userListRule } from '~/rules';

@Controller('user', [tokenAuth])
class UserController {
    constructor(private userCore: UserCore) { }

    @Get()
    @Apply(adminAuth)
    @Sanitize(userListRule)
    public userList(req: RequestX): Promise<ResponseX> {
        return this.userCore.getUserList(req.payload);
    }

    @Post()
    @Apply(adminAuth)
    @Sanitize(createUserRule)
    public createUser(req: RequestX): Promise<ResponseX> {
        return this.userCore.createUser(req.payload);
    }

    @Patch()
    @Apply(adminAuth)
    @Sanitize(updateUserRule)
    public updateUser(req: RequestX): Promise<ResponseX> {
        return this.userCore.updateUser(req.payload);
    }

    @Delete(':id/delete')
    @Apply(adminAuth)
    @Sanitize(updateUserRule)
    public deleteUser(req: RequestX): Promise<ResponseX> {
        return this.userCore.deleteUser(req.payload);
    }
}

export { UserController };