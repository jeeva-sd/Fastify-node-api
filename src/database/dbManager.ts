import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { appConfig } from "~/config";

const { host, username, port, password, dbName, connectionLimit, url } = appConfig.database;

const poolConnection = mysql.createPool({
    host: host,
    port: port,
    user: username,
    password: password,
    database: dbName,
    connectionLimit: connectionLimit,
});

export const db = drizzle(poolConnection);