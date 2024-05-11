import { CorsConfig, StaticPathConfig, ServerConfig, ValidationConfig, FileUploadsConfig } from '~/server';

export interface AppInfo {
  version: string;
  name: string;
  port: number;
  environment: string;
}

export interface JwtConfig {
  accessSecretKey: string;
  refreshSecretKey: string;
  accessExpirationDays: number;
  refreshExpirationDays: number;
}

export interface BcryptConfig {
  saltRounds: number;
}

export interface SqlConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  connectionLimit: number;
  url: string;
}

export interface GeneralConfig {
  allowedDomains: string;
}

export interface RoleConfig {
  moderator: number;
  superAdmin: number;
  admin: number;
  editor: number;
}

export interface StatusConfig {
  active: number;
  inactive: number;
}
export interface AppConfig {
  server: ServerConfig;
  app: AppInfo;
  jwt: JwtConfig;
  bcrypt: BcryptConfig;
  testDatabase: SqlConfig;
  localDatabase: SqlConfig;
  validation: ValidationConfig;
  role: RoleConfig;
  status: StatusConfig;
  cors: CorsConfig;
  static: StaticPathConfig;
  uploads: FileUploadsConfig;
}