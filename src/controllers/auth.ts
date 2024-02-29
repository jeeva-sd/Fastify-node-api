import { ResponseX, Controller, Sanitize, Get, Apply } from '~/utils';
import { AuthCore } from '~/core';
import { registerSchema } from '~/entities';
import { dummyMiddleware } from '~/middlewares';

@Controller('/auth')
class AuthController {
    private core: AuthCore;

    @Get('/register')
    @Sanitize(registerSchema)
    @Apply(dummyMiddleware)
    public register(): Promise<ResponseX> {
        return this.authCore().loginUser();
    }

    private authCore(): AuthCore {
        if (!this.core) this.core = new AuthCore();
        return this.core;
    }
}

export { AuthController };