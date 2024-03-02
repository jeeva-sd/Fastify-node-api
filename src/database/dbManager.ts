import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { appConfig } from "~/config";

const { host, username, port, password, dbName, connectionLimit, url } = appConfig.database;

const poolConnection = mysql.createPool({
    uri: url
});

const db = drizzle(poolConnection);