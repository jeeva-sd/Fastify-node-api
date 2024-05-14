import { PoolOptions } from 'mysql2';

export interface SqlConnectionConfig {
    [key: string]: PoolOptions;
}