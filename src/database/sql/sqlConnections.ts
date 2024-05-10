import { appConfig } from '~/config';
import { testSchema } from './testDB/testDB.schema';
import { DatabaseManager } from './sqlManager';
import { SqlConnectionConfig } from './type';
import { MySql2Database } from 'drizzle-orm/mysql2';

// Define database configurations
const connectionConfig: SqlConnectionConfig = {
    testDB: {
        host: appConfig.testDatabase.host,
        user: appConfig.testDatabase.user,
        port: appConfig.testDatabase.port,
        password: appConfig.testDatabase.password,
        database: appConfig.testDatabase.database,
        connectionLimit: 10,
    },
    localDB: {
        host: appConfig.localDatabase.host,
        user: appConfig.localDatabase.user,
        port: appConfig.localDatabase.port,
        password: appConfig.localDatabase.password,
        database: appConfig.localDatabase.database,
        connectionLimit: 10,
    },
};

// Create a database manager instance
export const sqlDbManager = new DatabaseManager(connectionConfig);

// Get connections
export const testDB = sqlDbManager.getConnection('testDB', testSchema) as MySql2Database<typeof testSchema>;
export const localDB = sqlDbManager.getConnection('localDB', testSchema) as MySql2Database<typeof testSchema>;
