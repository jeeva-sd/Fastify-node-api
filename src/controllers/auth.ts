import { ResponseX, Controller, Sanitize, Get } from '~/utils';
import { AuthCore } from '~/core';
import { registerSchema } from '~/entities';

@Controller('/auth')
class AuthController {
    private core: AuthCore;

    @Get('/register')
    @Sanitize(registerSchema)
    public register(): Promise<ResponseX> {
        return this.authCore().loginUser();
    }

    private authCore(): AuthCore {
        if (!this.core) this.core = new AuthCore();
        return this.core;
    }
}

export { AuthController };