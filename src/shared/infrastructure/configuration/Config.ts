import { injectable } from "inversify";
import 'reflect-metadata';

const { PG_USER, PG_HOST, PG_DATABASE, PG_PASSWORD, PG_PORT, LOGGER_LEVEL } = process.env;

export interface configType {
  loggerLevel: string
  postgres: {
    database: string,
    host: string,
    max: number,
    password: string,
    port: number,
    user: string,
  }
}

@injectable()
export class Config {
  config: configType;

  constructor() {
    this.config = {
      loggerLevel: LOGGER_LEVEL || '',
      postgres: {
        database: PG_DATABASE || '',
        host: PG_HOST || 'postgres',
        max: 10,
        password: PG_PASSWORD || '',
        port: Number(PG_PORT) || 5432,
        user: PG_USER || 'postgres',
      }
    };
  }
}
