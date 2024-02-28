import { readEnv } from '~/utils';
import { AppConfig } from './types';

export const appConfig: AppConfig = {
    app: {
        version: readEnv('VERSION', 'v1.0.0'),
        name: readEnv('APP_NAME', 'Node-API'),
        port: readEnv('PORT', 1314),
        environment: readEnv('NODE_ENV', 'dev'),
    },
    jwt: {
        accessSecretKey: readEnv('JWT_ACCESS_SECRET_KEY', 'default-access-secret'),
        refreshSecretKey: readEnv('JWT_REFRESH_SECRET_KEY', 'default-refresh-secret'),
        idSecretKey: readEnv('JWT_ID_SECRET_KEY', 'default-id-secret'),
        accessExpirationDays: readEnv('JWT_ACCESS_EXPIRATION_DAYS', 7),
        refreshExpirationDays: readEnv('JWT_REFRESH_EXPIRATION_DAYS', 30),
        idExpirationDays: readEnv('JWT_ID_EXPIRATION_DAYS', 30),
    },
    crypto: {
        algorithm: readEnv('CRYPTO_ALGORITHM', 'aes-256-ctr'),
        secret: readEnv('CRYPTO_SECRET', 'default-crypto-secret'),
        expirationDays: readEnv('CRYPTO_EXPIRATION_DAYS', 2),
    },
    database: {
        host: readEnv('DB_HOST', 'localhost'),
        port: readEnv('DB_PORT', 3306),
        username: readEnv('DB_USERNAME', 'default-username'),
        password: readEnv('DB_PASSWORD', 'default-password'),
        dbName: readEnv('DB_NAME', 'default-db-name'),
        connectionLimit: readEnv('DB_CONNECTION_LIMIT', 20),
        isMultipleStatement: readEnv('DB_IS_MULTIPLE_STATEMENT', true),
        shouldWaitForConnections: readEnv('DB_SHOULD_WAIT_FOR_CONNECTIONS', false),
        url: readEnv('DATABASE_URL', 'mysql://root:QwertyuI@localhost:3306/demo'),
    },
    general: {
        allowedDomains: readEnv('ALLOWED_DOMAINS', 'http://localhost:5173'),
    },
    cookie: {
        httpOnly: readEnv('COOKIE_HTTP_ONLY', false),
        secure: readEnv('SECURE_COOKIE', false),
        expire: readEnv('COOKIE_MAX_AGE', 60 * 60 * 24 * 7),
        sameSite: readEnv('SAME_SITE_COOKIE', 'none'),
    },
    validation: {
        abortEarly: readEnv('ABORT_EARLY', true)
    },
    role: {
        developer: readEnv('DEVELOPER_ROLE', 1),
        superAdmin: readEnv('SUPER_ADMIN_ROLE', 2),
        admin: readEnv('ADMIN_ROLE', 3),
        standardUser: readEnv('STANDARD_USER_ROLE', 4),
        spectator: readEnv('SPECTATOR_ROLE', 5),
    },
    status: {
        active: readEnv('ACTIVE_STATUS', 1),
        banned: readEnv('BANNED_STATUS', 0),
        hold: readEnv('HOLD_STATUS', -1),
        inactive: readEnv('IN_ACTIVE_STATUS', -2),
        issued: readEnv('ISSUED_STATUS', 100),
        rejected: readEnv('REJECTED_STATUS', 101),
        completed: readEnv('COMPLETED_STATUS', 101),
    },
};