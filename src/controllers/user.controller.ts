import { Controller, Sanitize, Post, Patch, Apply, Get, Delete, RequestX } from '~/server';
import { adminAuth, fileGuard, tokenAuth } from '~/middlewares';
import { UserCore } from '~/core/user';
import { createUserRule, updateAvatarRule, updateUserRule, userListRule } from '~/rules';

@Controller('user', [tokenAuth])
class UserController {
    constructor(private userCore: UserCore) { }

    @Get()
    @Sanitize(userListRule)
    public userList(req: RequestX) {
        return this.userCore.getUserList(req.payload);
    }

    @Post()
    @Apply(adminAuth)
    @Sanitize(createUserRule)
    public createUser(req: RequestX) {
        return this.userCore.createUser(req.payload);
    }

    @Patch()
    @Apply(adminAuth)
    @Sanitize(updateUserRule)
    public updateUser(req: RequestX) {
        return this.userCore.updateUser(req.payload);
    }

    @Delete(':id/delete')
    @Apply(adminAuth)
    @Sanitize(updateUserRule)
    public deleteUser(req: RequestX) {
        return this.userCore.deleteUser(req.payload);
    }

    @Post('update-avatar')
    @Apply([adminAuth, fileGuard('avatar')])
    @Sanitize(updateAvatarRule)
    public updateAvatar(req: RequestX) {
        return req.payload;
    }
}

export { UserController };