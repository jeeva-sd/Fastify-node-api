import { CorsConfig, CookieConfig, StaticPathConfig, ServerConfig } from '~/utils';

export interface Environment {
  [key: string]: string | undefined;
}

export interface AppInfo {
  version: string;
  name: string;
  port: number;
  environment: string;
}

export interface JwtConfig {
  accessSecretKey: string;
  refreshSecretKey: string;
  idSecretKey: string;
  accessExpirationDays: number;
  refreshExpirationDays: number;
  idExpirationDays: number;
}

export interface CryptoConfig {
  algorithm: string;
  secret: string;
  expirationDays: number;
}

export interface DbConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  dbName: string;
  connectionLimit: number;
  url: string;
}

export interface GeneralConfig {
  allowedDomains: string;
}

export interface IValidationConfig {
  abortEarly: boolean;
}

export interface RoleConfig {
  developer: number;
  superAdmin: number;
  admin: number;
  standardUser: number;
  spectator: number;
}

export interface StatusConfig {
  active: number;
  banned: number;
  hold: number;
  inactive: number;
  issued: number;
  rejected: number;
  completed: number;
}
export interface AppConfig {
  server: ServerConfig;
  app: AppInfo;
  jwt: JwtConfig;
  crypto: CryptoConfig;
  database: DbConfig;
  validation: IValidationConfig;
  cookie: CookieConfig;
  role: RoleConfig;
  status: StatusConfig;
  cors: CorsConfig;
  static: StaticPathConfig;
}