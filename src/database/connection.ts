import { drizzle } from 'drizzle-orm/mysql2';
import mysql, { Pool } from 'mysql2/promise';
import { appConfig } from '~/config';
import { log } from '~/utils';
import { schema } from './schema';

export class Database {
    private static instance: Database;
    private poolConnection: Pool;

    private constructor() {
        const { host, user, port, password, database, connectionLimit } = appConfig.database;
        this.poolConnection = mysql.createPool({ host, port, user, password, database, connectionLimit });
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }

    public getDB() {
        return drizzle(this.poolConnection, { schema, mode: 'default' });
    }

    public async closeConnections(): Promise<void> {
        if (Database.instance) {
            log('Closing db connections...');
            await this.poolConnection.end();
        }
    }
}

export const db = Database.getInstance().getDB();
