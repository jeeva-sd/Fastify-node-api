import { ResponseX, Controller, Sanitize, Get, Apply } from '~/utils';
import { AuthCore } from '~/core';
import { registerPayload } from '~/entities';
import { dummyMiddleware } from '~/middlewares';

@Controller('/auth')
class AuthController {
    private core: AuthCore;

    @Get('/register')
    @Sanitize(registerPayload)
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