import { MySql2Database } from 'drizzle-orm/mysql2';
import { sqlConnections } from '~/services';
import { testSchema } from './testDB.schema';

export const testDB = sqlConnections.getConnection('testDB', testSchema) as MySql2Database<typeof testSchema>;
