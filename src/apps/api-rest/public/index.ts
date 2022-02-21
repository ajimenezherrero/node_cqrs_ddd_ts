import { injectable, inject } from 'inversify';
import express from 'express';

import PublicApiContainer from './module';

import { BootstrapTypes, PublicApiTypes } from '../../../types';

import { Config } from '../../../shared/infrastructure/configuration/Config';
import { Logger } from '../../../shared/infrastructure/logger/Logger';
import Server from '../../../shared/domain/Server';

import ExpressServer, { Router } from '../../../shared/infrastructure/http/Express/ExpressServer';
@injectable()
class PublicApi implements Server {
  serverName = 'Recipe App';
  server: ExpressServer;
  config: Config;
  logger: Logger;
  routers: Array<Router>;

  constructor(
    @inject(BootstrapTypes.Logger) logger: Logger,
    @inject(BootstrapTypes.Config) config: Config,
    @inject(PublicApiTypes.ingredientRouter) ingredientRouter: express.Router,
    @inject(PublicApiTypes.recipeRouter) recipeRouter: express.Router,
  ) {
    this.config = config;
    this.logger = logger;
    this.routers = [
      {
        path: '/ingredients',
        router: ingredientRouter,
      },
      {
        path: '/recipes',
        router: recipeRouter,
      },
    ];
    this.server = new ExpressServer(
      this.routers,
      this.logger,
      this.config.applications.apiRest.port,
      this.serverName,
    );
  }

  start(): void {
    this.server.start();
  }
}

export default PublicApi;

export { PublicApiContainer };
