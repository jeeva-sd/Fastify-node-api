import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import { appConfig } from './src/config';

export default {
    schema: './src/database/schema.ts',
    out: './src/database/migrations',
    driver: 'mysql2',
    dbCredentials: {
        uri: appConfig.database.url
    },
} satisfies Config;