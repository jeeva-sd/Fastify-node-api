import mysql from 'mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { drizzle } from 'drizzle-orm/mysql2';
import { appConfig } from '../config';
import { extractError } from '../utils';

(async () => {
    let connection = null;

    try {
        const { host, user, port, password, database } = appConfig.database;
        connection = mysql.createPool({ host, user, port, password, database, connectionLimit: 1 });

        const db = drizzle(connection);
        await migrate(db, { migrationsFolder: './migrations' });
        console.log('Migration done!');
    }
    catch (error) {
        console.error('Migration failed:', extractError(error));
    }
    finally {
        connection?.end();
    }
})();
