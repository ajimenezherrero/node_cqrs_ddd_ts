import express from 'express';
import Server from '../../../domain/Server';
import { Logger } from '../../logger/Logger';

import ErrorManager from './ErrorManager';

export type Router = {
  path: string,
  router: express.Router
}

class ExpressServer implements Server {
  server: express.Express;
  routers: Array<Router>;
  logger: Logger;
  port: number;
  serverName: string;

  constructor(routers: Array<Router>, logger: Logger, port: number, serverName: string) {
    this.routers = routers;
    this.logger = logger;
    this.port = port;
    this.serverName = serverName;
    this.server = express();
  }

  initRoutes(): void {
    this.server.get('/', (req, res) => {
      res.send(`${this.serverName} is running...`).end();
    });

    this.routers.forEach(({path, router}) => {
      this.server.use(path, router);
    });
  }

  start(): void {
    this.server.use(express.json());
    this.initRoutes();
    this.server.use(new ErrorManager(this.logger).errorManagement());
    this.server.listen(this.port, () => {
      this.logger.info(`${this.serverName} listen on port ${this.port}...`);
      this.logger.info('= = = = = = = = = = = = = = = = = = = = =');
    });
  }
}

export default ExpressServer;
