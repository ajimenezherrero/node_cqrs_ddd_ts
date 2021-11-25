import { inject, injectable } from 'inversify';
import { Pool, PoolConfig, QueryResult } from 'pg';
import { Logger } from '../../logger/Logger';
import { BootstrapTypes } from '../../../../types';
import { Config } from '../../configuration/Config';

@injectable()
export class Postgresql {
  logger: Logger;
  configPg: PoolConfig;
  poolInstance?: Pool;

  constructor(@inject(BootstrapTypes.Logger) logger: Logger, @inject(BootstrapTypes.Config) config: Config) {
    this.logger = logger;
    this.logger.info('Postgresql constructor');

    this.configPg = config.postgres;
  }

  getPool(): Pool {
    if (!this.poolInstance) {
      this.logger.info('Creating a Pool for Postgresql');

      this.poolInstance = new Pool(this.configPg);
    }

    return this.poolInstance;
  }

  async query(queryString: string, values?: string[]): Promise<QueryResult> {
    const pool = this.getPool();
    const client = await pool.connect();

    try {
      return await client.query(queryString, values);
    } finally {
      client.release();
    }
  }
}
