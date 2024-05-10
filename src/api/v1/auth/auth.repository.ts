import { eq } from 'drizzle-orm';
import { Result, RepoGuard } from '~/api/shared';
import { UserResult, db, schema } from '~/database';

class AuthRepository {

    @RepoGuard
    public async findUserByEmail(email: string): Promise<Result<UserResult>> {
        const userRecord = await db.query.user.findFirst({
            where: eq(schema.user.email, email),
        });

        return { data: userRecord };
    }

    @RepoGuard
    public async findUserById(id: number): Promise<Result<UserResult>> {
        const userRecord = await db.query.user.findFirst({
            where: eq(schema.user.id, id),
        });

        return { data: userRecord };
    }

    @RepoGuard
    public async resetUserPassword({
        userId,
        newPassword
    }: { userId: number, newPassword: string; }): Promise<Result<null>> {
        await db
            .update(schema.user)
            .set({ password: newPassword })
            .where(eq(schema.user.id, userId));

        return { data: null };
    }
}

export { AuthRepository };