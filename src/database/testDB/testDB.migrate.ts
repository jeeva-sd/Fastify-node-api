import mysql from 'mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { drizzle } from 'drizzle-orm/mysql2';
import { extractError, log } from '~/helpers';
import { appConfig } from '~/config';

(async () => {
    let connection = null;

    try {
        const { host, user, port, password, database } = appConfig.testDatabase;
        connection = mysql.createPool({ host, user, port, password, database, connectionLimit: 1 });

        const db = drizzle(connection);
        await migrate(db, { migrationsFolder: './migrations' });
        log('Migration done!');
    }
    catch (error) {
        console.error('Migration failed:', extractError(error));
    }
    finally {
        connection?.end();
    }
})();
