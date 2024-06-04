import { eq } from 'drizzle-orm';
import { Exception, Injectable } from '~/server';
import { testDB, testSchema } from '~/database/testDB';
import { getAffectedRows } from '~/helpers';

@Injectable()
class AuthRepository {
    constructor() { }

    public async findUserByEmail(email: string) {
        const userRecord = await testDB.query.user.findFirst({
            where: eq(testSchema.user.email, email),
        });

        return userRecord;
    }

    public async findUserById(id: number) {
        const userRecord = await testDB.query.user.findFirst({
            where: eq(testSchema.user.id, id),
        });

        return userRecord;
    }

    public async resetUserPassword({
        userId,
        newPassword
    }: { userId: number, newPassword: string; }) {
        const result = await testDB
            .update(testSchema.user)
            .set({ password: newPassword })
            .where(eq(testSchema.user.id, userId));

        if (!getAffectedRows(result)) throw new Exception(404);
        return null;
    }
}

export { AuthRepository };