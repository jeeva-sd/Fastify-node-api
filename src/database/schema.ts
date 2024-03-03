import { relations } from 'drizzle-orm';
import { index, int, mysqlTable, bigint, varchar } from 'drizzle-orm/mysql-core';

// Define the tables
export const users = mysqlTable('users', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    fullName: varchar('full_name', { length: 256 }),
    email: varchar('email', { length: 256 }).notNull().default('hello@example.com'),
}, (users) => ({
    nameIdx: index('name_idx').on(users.fullName),
}));

export const userRelations = relations(users, ({ one, many }) => ({
    auth: one(authOtps, {
        fields: [users.id],
        references: [authOtps.userId],
    }),
    authList: many(authOtps),
}));

export const authOtps = mysqlTable('auth_otp', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    phone: varchar('phone', { length: 256 }),
    userId: int('user_id'),
    orgId: int('org_id'),
});

export const authRelations = relations(authOtps, ({ one }) => ({
    userDetails: one(users, {
        fields: [authOtps.userId],
        references: [users.id],
    }),
}));