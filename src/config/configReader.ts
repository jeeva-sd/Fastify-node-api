import path from 'path';
import { readEnv } from '~/server/handlers/env.handler';
import { AppConfig } from './types';

export const appConfig: AppConfig = {
    server: {
        caseSensitive: readEnv('SERVER_CASE_SENSITIVE', false),
        ignoreDuplicateSlashes: readEnv('SERVER_IGNORE_DUPLICATE_SLASHES', true),
        onProtoPoisoning: readEnv('SERVER_ON_PROTO_POISONING', 'remove'),
        onConstructorPoisoning: readEnv('SERVER_ON_CONSTRUCTOR_POISONING', 'remove'),
        ignoreTrailingSlash: readEnv('SERVER_IGNORE_TRAILING_SLASHES', true),
        logger: {
            enabled: readEnv('SERVER_LOGGER_ENABLED', false),
            level: readEnv('SERVER_LOGGER_LEVEL', 'info'),
            transport: {
                target: readEnv('SERVER_LOGGER_TRANSPORT_TARGET', 'pino-pretty'),
            },
        },
    },
    app: {
        version: readEnv('APP_VERSION', 'v1.0.0'),
        name: readEnv('APP_NAME', 'Node-API'),
        port: readEnv('APP_PORT', 1314),
        environment: readEnv('NODE_ENV', 'dev'),
    },
    cors: {
        origin: readEnv('CORS_ORIGIN', '*'),
        credentials: readEnv('CORS_CREDENTIALS', true),
        preflight: readEnv('CORS_PREFLIGHT', true),
        preflightContinue: readEnv('CORS_PREFLIGHT_CONTINUE', false),
        optionsSuccessStatus: readEnv('CORS_OPTIONS_SUCCESS_STATUS', 204),
    },
    static: {
        root: path.join(__dirname, readEnv('STATIC_ROOT_PATH', '../../public')),
        prefix: readEnv('STATIC_PREFIX', '/public/'),
    },
    uploads: {
        limits: {
            fieldNameSize: readEnv('UPLOADS_LIMIT_FIELD_NAME_SIZE', 100), // Max field name size in bytes
            fieldSize: readEnv('UPLOADS_LIMIT_FIELD_SIZE', 1024 * 1024), // Max field value size in bytes
            fields: readEnv('UPLOADS_LIMIT_FIELDS', 10), // Max number of non-file fields
            fileSize: readEnv('UPLOADS_LIMIT_FIELD_SIZE', 1024 * 1024 * 1), // Max file size in bytes (10MB)
            files: readEnv('UPLOADS_LIMIT_FILES', 10), // Max number of file fields
            headerPairs: readEnv('UPLOADS_LIMIT_HEADER_PAIRS', 200) // Max number of header key-value pairs
        }
    },
    jwt: {
        accessSecretKey: readEnv('JWT_ACCESS_SECRET_KEY', 'default-access-secret'),
        refreshSecretKey: readEnv('JWT_REFRESH_SECRET_KEY', 'default-refresh-secret'),
        accessExpirationDays: readEnv('JWT_ACCESS_EXPIRATION_DAYS', 1 * 24 * 60 * 60), // 1 day
        refreshExpirationDays: readEnv('JWT_REFRESH_EXPIRATION_DAYS', 1 * 24 * 60 * 60), // 1 day
    },
    jobs: {
        queueName: readEnv('JWT_ACCESS_SECRET_KEY', 'job_queue'),
        host: readEnv('JWT_ACCESS_SECRET_KEY', 'amqp://localhost'),
        durable: readEnv('JWT_ACCESS_SECRET_KEY', true),
    },
    mailer: {
        service: readEnv('JWT_ACCESS_SECRET_KEY', 'gmail'),
        appEmail: readEnv('JWT_ACCESS_SECRET_KEY', 'styls360@gmail.com'),
        password: readEnv('JWT_ACCESS_SECRET_KEY', 'qxbj plqf bvjl uzlj'),
    },
    bcrypt: {
        saltRounds: readEnv('BCRYPT_SALT_ROUNDS', 10),
    },
    testDatabase: {
        host: readEnv('LOCAL_DATABASE_HOST', 'localhost'),
        port: readEnv('LOCAL_DATABASE_PORT', 3306),
        user: readEnv('LOCAL_DATABASE_USERNAME', 'demoUser'),
        password: readEnv('LOCAL_DATABASE_PASSWORD', 'QwertyuI@123'),
        database: readEnv('LOCAL_DATABASE_NAME', 'test'),
        connectionLimit: readEnv('LOCAL_DATABASE_CONNECTION_LIMIT', 10),
        url: readEnv('LOCAL_DATABASE_URL', 'mysql://demoUsers:QwertyuI@123@localhost:3306/test'),
    },
    localDatabase: {
        host: readEnv('LOCAL_DATABASE_HOST', 'localhost'),
        port: readEnv('LOCAL_DATABASE_PORT', 3306),
        user: readEnv('LOCAL_DATABASE_USERNAME', 'demoUser'),
        password: readEnv('LOCAL_DATABASE_PASSWORD', 'QwertyuI@123'),
        database: readEnv('LOCAL_DATABASE_NAME', 'test'),
        connectionLimit: readEnv('LOCAL_DATABASE_CONNECTION_LIMIT', 10),
        url: readEnv('LOCAL_DATABASE_URL', 'mysql://demoUsers:QwertyuI@123@localhost:3306/test'),
    },
    validation: {
        abortEarly: readEnv('VALIDATION_ABORT_EARLY', true),
        stripUnknown: readEnv('VALIDATION_STRIP_UNKNOWNS', true),
        recursive: readEnv('VALIDATION_RECURSIVE', true)
    },
    role: {
        superAdmin: readEnv('ROLE_SUPER_ADMIN', 1),
        admin: readEnv('ROLE_ADMIN', 2),
        moderator: readEnv('ROLE_MODERATOR', 3),
        editor: readEnv('ROLE_EDITOR', 4),
    },
    status: {
        active: readEnv('STATUS_ACTIVE', 1),
        inactive: readEnv('STATUS_INACTIVE', -1),
    },
};