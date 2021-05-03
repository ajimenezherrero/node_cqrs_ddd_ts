import express from 'express';

import { Config } from '../../../shared/infrastructure/configuration/Config';
import { Logger } from '../../../shared/infrastructure/logger/Logger';

class ApiRest {
  server = express();
  config: Config;
  logger: Logger;

  constructor(config: Config, logger: Logger) {
    this.config = config;
    this.logger = logger;
  }

  initRoutes() {
    this.server.get('/', (req, res, next) => {
      res.send('Backoffice is running...');
      next();
    });

    this.server.get('/health-check', (req, res, next) => {
      res.send('Backoffice Working...');
      next();
    });

    this.server.get('/error', (req, res, next) => {
      next(new Error('Force Error'));
    });
  }
  
  start() {
    this.initRoutes();

    this.server.listen(this.config.applications.backoffice.port, () => {
      this.logger.info(`Application server listen on port ${this.config.applications.backoffice.port}...`);
      this.logger.info('= = = = = = = = = = = = = = = = = = = = =');
    });  
  }
}

export default ApiRest;