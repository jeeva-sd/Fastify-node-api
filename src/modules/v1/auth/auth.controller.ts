import { RequestX, ResponseX } from '~/server';
import { Controller, Sanitize, Post, Apply } from '~/modules/shared';
import { loginPayload, resetPasswordPayload } from './entities/payload';
import { tokenAuth } from './auth.middleware';
import { AuthCore } from './auth.core';
import { TokenData } from './entities/type';

@Controller('auth')
class AuthController {
    private core: AuthCore;

    @Post('login')
    @Sanitize(loginPayload)
    public login(req: RequestX): Promise<ResponseX> {
        return this.authCore().login(req.payload);
    }

    @Post('reset-password')
    @Apply([tokenAuth])
    @Sanitize(resetPasswordPayload)
    public resetPassword(req: RequestX): Promise<ResponseX> {
        return this.authCore().resetPassword(req.payload, req.tokenData as TokenData);
    }

    private authCore(): AuthCore {
        if (!this.core) this.core = new AuthCore();
        return this.core;
    }
}

export { AuthController };