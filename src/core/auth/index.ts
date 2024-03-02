import { CoreGuard, ResponseX, take } from '~/utils';
import { db, users } from '~/database';

class AuthCore {

    @CoreGuard
    public async loginUser(): Promise<ResponseX> {
        const user = await db.select().from(users);
        return take(200, user);
    }
}

export { AuthCore };