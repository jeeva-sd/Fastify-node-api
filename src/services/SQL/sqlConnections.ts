import { appConfig } from '~/config';
import SQLService from './sql.service';
import { SqlConnectionConfig } from './type';

// Define database configurations
const connectionConfig: SqlConnectionConfig = {
    testDB: {
        host: appConfig.testDatabase.host,
        user: appConfig.testDatabase.user,
        port: appConfig.testDatabase.port,
        password: appConfig.testDatabase.password,
        database: appConfig.testDatabase.database,
        connectionLimit: appConfig.testDatabase.connectionLimit,
    },
    localDB: {
        host: appConfig.localDatabase.host,
        user: appConfig.localDatabase.user,
        port: appConfig.localDatabase.port,
        password: appConfig.localDatabase.password,
        database: appConfig.localDatabase.database,
        connectionLimit: appConfig.localDatabase.connectionLimit,
    },
};

// Create a database manager instance
export const sqlConnections = SQLService(connectionConfig);
