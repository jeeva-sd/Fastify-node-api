import { appConfig } from './src/config/configReader';
import { defineConfig } from 'drizzle-kit';

const dbConfig = appConfig.testDatabase;

export default defineConfig({
    dialect: 'mysql',
    dbCredentials: {
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database,
        port: dbConfig.port,
    },
    schema: './src/database/localDB/localDB.schema.ts',
    introspect: { casing: 'camel' },
    out: 'migrations',
});
