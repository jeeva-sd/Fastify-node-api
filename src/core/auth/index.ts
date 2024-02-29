import { CoreGuard, ResponseX, take } from '~/utils';

class AuthCore {

    @CoreGuard
    public async loginUser(): Promise<ResponseX> {
        return take(200);
    }
}

export { AuthCore };