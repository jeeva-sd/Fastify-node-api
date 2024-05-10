import { PoolOptions } from "mysql2";
import { InferSelectModel } from 'drizzle-orm';
import { testSchema } from './testDB/testDB.schema';

export interface SqlConnectionConfig {
    [key: string]: PoolOptions;
}


// User
export type UsersTableSelectModel = InferSelectModel<typeof testSchema.user>;
export type UserResult = Pick<UsersTableSelectModel, 'id' | 'name' | 'password' | 'roleId' | 'createdAt' | 'email'>;