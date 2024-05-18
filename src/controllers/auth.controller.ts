import { Apply, Controller, Post, Sanitize, RequestX, ResponseX } from '~/server';
import { tokenAuth } from '~/middlewares';
import { loginRule, resetPasswordRule } from '~/rules';
import { AuthCore, TokenData } from '~/core/auth';

@Controller('auth')
class AuthController {
    constructor(private authCore: AuthCore) { }

    @Post('login')
    @Sanitize(loginRule)
    public login(req: RequestX): Promise<ResponseX> {
        return this.authCore.login(req.payload);
    }

    @Post('reset-password')
    @Apply(tokenAuth)
    @Sanitize(resetPasswordRule)
    public resetPassword(req: RequestX): Promise<ResponseX> {
        return this.authCore.resetPassword(req.payload, req.tokenData as TokenData);
    }
}

export { AuthController };