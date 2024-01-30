import "reflect-metadata";
import { DataSource } from "typeorm";

export interface DataSourceConfig {
  database: string;
  user: string;
  password: string;
}

export async function getDataSource(config: DataSourceConfig) {
  try {
    const AppDataSource = new DataSource({
      type: "mariadb",
      entities: [],
      migrations: [],
      synchronize: false,
      host: "localhost",
      port: 3306,
      database: config.database,
      username: config.user,
      password: config.password,
    });

    if (!AppDataSource.isInitialized) return await AppDataSource.initialize();
    else return AppDataSource;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

