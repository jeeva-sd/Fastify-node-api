import { CoreGuard, ResponseX, take } from '~/utils';
import { authOtps, db, users } from '~/database';
import { eq, sql } from 'drizzle-orm';
import { alias } from 'drizzle-orm/mysql-core';

class AuthCore {

    @CoreGuard
    public async loginUser(): Promise<ResponseX> {
        const parent = alias(users, 'parent');
        const user = await db.select().from(parent).leftJoin(authOtps, eq(parent.id, authOtps.userId));
        const userOne = await db.execute(sql`select full_name from ${users} where ${users.id} = ${1}`);

        const userTwo = await db.query.users.findMany({
            with: {
                auth: {
                    columns: {
                        phone: true,
                    }
                },
                // authList: {
                //     with: {
                //         phone: true,
                //     },
                // },
            }
        });

        return take(200, { userTwo });
    }
}

export { AuthCore };