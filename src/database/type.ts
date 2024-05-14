import { InferSelectModel } from 'drizzle-orm';
import { testSchema } from './testDB/testDB.schema';

// User
export type UsersTableSelectModel = InferSelectModel<typeof testSchema.user>;
export type UserResult = Pick<UsersTableSelectModel, 'id' | 'name' | 'password' | 'roleId' | 'createdAt' | 'email'>;