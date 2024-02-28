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
  isMultipleStatement: boolean;
  shouldWaitForConnections: boolean;
  url: string;
}

export interface GeneralConfig {
  allowedDomains: string;
}

export interface IValidationConfig {
  abortEarly: boolean;
}

export interface CookieConfig {
  httpOnly: boolean;
  secure: boolean;
  expire: number;
  sameSite: boolean;
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
  app: AppInfo;
  jwt: JwtConfig;
  crypto: CryptoConfig;
  database: DbConfig;
  general: GeneralConfig;
  validation: IValidationConfig;
  cookie: CookieConfig;
  role: RoleConfig;
  status: StatusConfig;
}