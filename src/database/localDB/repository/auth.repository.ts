import { eq } from 'drizzle-orm';
import { Exception } from '~/server';
import { getAffectedRows } from '~/helpers';
import { UserResult } from '~/database/type';
import { testDB, testSchema } from '~/database/testDB';
import { UserRepository } from './user.repository';
import { Injectable } from '~/server/inj';

@Injectable()
class AuthRepository {
    constructor(private userRepo: UserRepository) { }

    public async findUserByEmail(email: string): Promise<UserResult | undefined> {
        const userRecord = await testDB.query.user.findFirst({
            where: eq(testSchema.user.email, email),
        });

        return userRecord;
    }

    public async findUserById(id: number): Promise<UserResult | undefined> {
        const userRecord = await testDB.query.user.findFirst({
            where: eq(testSchema.user.id, id),
        });

        return userRecord;
    }

    public async resetUserPassword({
        userId,
        newPassword
    }: { userId: number, newPassword: string; }): Promise<null> {
        const result = await testDB
            .update(testSchema.user)
            .set({ password: newPassword })
            .where(eq(testSchema.user.id, userId));

        if (!getAffectedRows(result)) throw new Exception(404);
        return null;
    }
}

export { AuthRepository };