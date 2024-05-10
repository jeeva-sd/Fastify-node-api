import { AnyColumn, and, asc, desc, eq, gt, like } from 'drizzle-orm';
import { getAffectedRows, getInsertId, selectCount } from '~/utils';
import { db, schema } from '~/database';
import { appConfig } from '~/config';
import { RepoGuard, Result } from '~/api/shared';
import {
    CreateUserPayload, UpdateUserPayload,
    UserListPayload, UserRecord
} from './entities/type';

class UserRepository {

    @RepoGuard
    public async findManyUsers(userListPayload: UserListPayload): Promise<Result<{
        userRecord: UserRecord[];
        totalRecords: number;
    }>> {
        const { page, limit, sortBy, sortType, searchTerm } = userListPayload;
        const offset = (page - 1) * limit;
        const take = limit;

        let sortByColumn: AnyColumn = schema.user.createdAt;
        if (sortBy === 'name') sortByColumn = schema.user.name;
        if (sortBy === 'email') sortByColumn = schema.user.email;
        if (sortBy === 'roleId') sortByColumn = schema.user.roleId;

        const isAscending = sortType.toUpperCase() === 'ASC';
        const orderByExpression = isAscending ? asc(sortByColumn) : desc(sortByColumn);

        const totalRecords = await db
            .select(selectCount)
            .from(schema.user)
            .where(
                and(
                    like(schema.user.name, `%${searchTerm}%`),
                    eq(schema.user.statusId, appConfig.status.active),
                )
            );

        const userRecord = await db
            .select({
                id: schema.user.id,
                name: schema.user.name,
                phone: schema.user.phone,
                email: schema.user.email,
                roleId: schema.user.roleId,
                statusId: schema.user.statusId,
                deviceId: schema.user.deviceId,
                location: schema.user.location,
                deviceOS: schema.user.deviceOS,
                createdAt: schema.user.createdAt,
            })
            .from(schema.user)
            .where(
                and(
                    eq(schema.user.statusId, appConfig.status.active),
                    offset ? gt(schema.user.id, offset) : undefined,
                    searchTerm ? like(schema.user.name, `%${searchTerm}%`) : undefined,
                ))
            .limit(take)
            .orderBy(orderByExpression);

        return { data: { totalRecords: totalRecords[0].count, userRecord } };
    }

    @RepoGuard
    public async insertUser(UserData: CreateUserPayload): Promise<Result<{ id: number; }>> {
        const userRecord = await db.insert(schema.user).values(UserData);
        return {
            data: {
                id: getInsertId(userRecord)
            }
        };
    }

    @RepoGuard
    public async updateUser({ id, ...rest }: UpdateUserPayload): Promise<Result<{ id: number; }>> {
        const updateQuery = await db.update(schema.user).set(rest).where(eq(schema.user.id, id));

        const updatedRows = getAffectedRows(updateQuery);
        if (!updatedRows) return { code: 404 };

        return {
            data: { id, ...rest }
        };
    }

    @RepoGuard
    public async deleteUser(id: number): Promise<Result<{ id: number; }>> {
        const deleteQuery = await db
            .update(schema.user)
            .set({ statusId: appConfig.status.inactive })
            .where(eq(schema.user.id, id));

        const updatedRows = getAffectedRows(deleteQuery);
        if (!updatedRows) return { code: 404 };

        return {
            data: { id }
        };
    }
}

export { UserRepository };