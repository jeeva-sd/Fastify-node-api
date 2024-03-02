import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { appConfig } from "~/config";

export class Database {
    private static instance: Database;
    private poolConnection: mysql.Pool;

    private constructor() {
        const { host, username, port, password, dbName, connectionLimit } = appConfig.database;
        this.poolConnection = mysql.createPool({
            host: host,
            port: port,
            user: username,
            password: password,
            database: dbName,
            connectionLimit: connectionLimit,
        });
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public getDB() {
        return drizzle(this.poolConnection);
    }

    public async closeConnections(): Promise<void> {
        if (Database.instance) {
            console.log('Closing db connections...');
            await this.poolConnection.end();
        }
    }
}

export const db = Database.getInstance().getDB();