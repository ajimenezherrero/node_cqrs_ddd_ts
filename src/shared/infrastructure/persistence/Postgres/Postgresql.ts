import { inject, injectable } from 'inversify';
import { Pool } from 'pg';
import { Logger } from '../../logger/Logger';
import { BootstrapTypes } from '../../../../types';
import { Config } from '../../configuration/Config';

@injectable()
export class Postgresql {
  logger: Logger;
  configPg: object;
  poolInstance: any;

  constructor(@inject(BootstrapTypes.Logger) logger: Logger, @inject(BootstrapTypes.Config) config: Config) {
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
