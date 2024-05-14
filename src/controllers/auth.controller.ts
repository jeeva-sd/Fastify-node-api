import { Apply, Controller, Post, Sanitize, RequestX, ResponseX } from '~/server';
import { tokenAuth } from '~/interceptors';
import { AuthCore, TokenData, loginPayload, resetPasswordPayload } from '~/core/auth';

@Controller('auth')
class AuthController {
    private core: AuthCore;

    @Post('login')
    @Sanitize(loginPayload)
    public login(req: RequestX): Promise<ResponseX> {
        return this.authCore().login(req.payload);
    }

    @Post('reset-password')
    @Apply(tokenAuth)
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