import { injectable, inject } from "inversify";
import express from "express";

import PublicApiContainer from "./module";

import { BootstrapTypes, PublicApiTypes } from "../../../types";

import { Config } from "../../../shared/infrastructure/configuration/Config";
import { Logger } from "../../../shared/infrastructure/logger/Logger";

@injectable()
class PublicApi {
  server: express.Express;
  config: Config;
  logger: Logger;
  router: express.Router;

  constructor(
    @inject(BootstrapTypes.Logger) logger: Logger,
    @inject(BootstrapTypes.Config) config: Config,
    @inject(PublicApiTypes.ingredientRouter) router: express.Router
  ) {
    this.config = config;
    this.logger = logger;
    this.router = router;
    this.server = express();
  }

  initRoutes() {
    this.server.get("/", (req, res, next) => {
      res.send("Recipe App is running...").end();
    });

    this.server.use("/ingredients", this.router);
  }

  start() {
    this.initRoutes();

    this.server.listen(this.config.applications.apiRest.port, () => {
      this.logger.info(
        `Application server listen on port ${this.config.applications.apiRest.port}...`
      );
      this.logger.info("= = = = = = = = = = = = = = = = = = = = =");
    });
  }
}

export default PublicApi;

export { PublicApiContainer };
