import { injectable, inject } from 'inversify';
import WinstonLogger from './WinstonLogger';
import { configType } from '../configuration/Config';
import { TYPES } from '../bootstrap/Types';

@injectable()
export class Logger {
  logger: any;

  constructor(@inject(TYPES.Config) config: configType) {
    this.logger = new WinstonLogger(config.loggerLevel).logger;
  }

  error(message: string, error: any, request: any) {
    this.logger.error(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  info(message: string) {
    this.logger.info(message);
  }

  http(message: string) {
    this.logger.http(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  silly(message: string) {
    this.logger.silly(message);
  }
}
