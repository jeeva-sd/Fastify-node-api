import { MySql2Database } from 'drizzle-orm/mysql2';
import { sqlConnections } from '~/services';
import { localSchema } from './localDB.schema';

// Get connections
export const localDB = sqlConnections.getConnection('localDB', localSchema) as MySql2Database<typeof localSchema>;
