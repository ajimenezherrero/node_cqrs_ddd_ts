import { inject } from "inversify";
import { Pool } from 'pg';
import { Logger } from "../../logger/Logger";
import { TYPES } from "../../bootstrap/Types";
import { configType } from "../../configuration/Config";


export class Postgresql {
  logger: Logger;
  configPg: object;
  poolInstance: any;

  constructor(@inject(TYPES.Logger) logger: Logger, @inject(TYPES.Config) config: configType) {
    this.logger = logger;
    this.logger.info('Postgresql constructor');

    this.configPg = config.postgres;
  }

  getPool() {
    if (!this.poolInstance) {
      this.logger.info('Creating a Pool for Postgresql');

      this.poolInstance = new Pool(this.configPg);
    }

    return this.poolInstance;
  }

  async query(queryString: string, values: string[]) {
    const pool = this.getPool();
    const client = await pool.connect();

    try {
      return await client.query(queryString, values);
    } finally {
      client.release();
    }
  }
}