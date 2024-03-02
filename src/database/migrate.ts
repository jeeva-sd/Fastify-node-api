import mysql from 'mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { drizzle } from 'drizzle-orm/mysql2';
import { appConfig } from '../config';
import { extractErrorMessage } from '../utils';

(async () => {
    let connection = null;

    try {
        connection = mysql.createConnection({
            host: appConfig.database.host,
            user: appConfig.database.username,
            password: appConfig.database.password,
            database: appConfig.database.dbName
        });

        const db = drizzle(connection);
        await migrate(db, { migrationsFolder: './src/database/migrations' });
    }
    catch (error) {
        console.error('Migration failed:', extractErrorMessage(error));
    }
    finally {
        connection?.end();
    }
})();
