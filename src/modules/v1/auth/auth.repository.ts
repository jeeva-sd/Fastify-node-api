import { eq } from 'drizzle-orm';
import { Result, RepoGuard } from '~/modules/shared';
import { UserResult, testDB, testSchema } from '~/database';

class AuthRepository {

    @RepoGuard
    public async findUserByEmail(email: string): Promise<Result<UserResult>> {
        const userRecord = await testDB.query.user.findFirst({
            where: eq(testSchema.user.email, email),
        });

        return { data: userRecord };
    }

    @RepoGuard
    public async findUserById(id: number): Promise<Result<UserResult>> {
        const userRecord = await testDB.query.user.findFirst({
            where: eq(testSchema.user.id, id),
        });

        return { data: userRecord };
    }

    @RepoGuard
    public async resetUserPassword({
        userId,
        newPassword
    }: { userId: number, newPassword: string; }): Promise<Result<null>> {
        await testDB
            .update(testSchema.user)
            .set({ password: newPassword })
            .where(eq(testSchema.user.id, userId));

        return { data: null };
    }
}

export { AuthRepository };