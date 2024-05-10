import { InferSelectModel } from 'drizzle-orm';
import { schema } from './schema';

// User
export type UsersTableSelectModel = InferSelectModel<typeof schema.user>;
export type UserResult = Pick<UsersTableSelectModel, 'id' | 'name' | 'password' | 'roleId' | 'createdAt' | 'email'>;