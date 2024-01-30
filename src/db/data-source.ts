import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { GoalCategory } from "./entities/goal-category.entity";
import { Goal } from "./entities/goal.entity";

export interface DataSourceConfig {
  database: string;
  user: string;
  password: string;
}

export async function getDataSource(config: DataSourceConfig) {
  try {
    const AppDataSource = new DataSource({
      type: "mariadb",
      entities: [User, GoalCategory, Goal],
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

