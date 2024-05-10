import type { Config } from 'drizzle-kit';
import { appConfig } from './src/config';

export default {
    schema: './src/database/sql/testDB/testDB.schema.ts',
    out: './migrations',
    driver: 'mysql2',
    dbCredentials: {
        uri: appConfig.testDatabase.url
    },
} satisfies Config;