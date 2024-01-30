export interface AppEnv {
  DB_NAME: string;
  DB_PASS: string;
  DB_USER: string;
  JWT_SECRET: string;
  JWT_EXPIRES: string;
}
export function getEnv(): AppEnv {
  const get = (name: string) => import.meta.env[name];
  return {
    DB_NAME: get("DB_NAME"),
    DB_USER: get("DB_USER"),
    DB_PASS: get("DB_PASS"),
    JWT_SECRET: get("JWT_SECRET"),
    JWT_EXPIRES: get("JWT_EXPIRES"),
  };
}

