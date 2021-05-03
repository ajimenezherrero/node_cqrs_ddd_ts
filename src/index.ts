import { Container } from "inversify";

import { Bootstrap } from "./shared/infrastructure/bootstrap/Bootstrap";
import { PublicApiContainer, PublicApiTypes } from "./apps/api-rest/public";
import IngredientModule from "./core/cook-book/ingredient/module";
import { types } from "./core/cook-book/ingredient/types";

import Server from "./shared/infrastructure/http/server/Server";

const start = async () => {
  try {
    const publicAPIContainer = new Container();
    const coreContainer = new Container();
    const bootstrap = new Bootstrap();

    publicAPIContainer.load(bootstrap.container, IngredientModule, PublicApiContainer);

    publicAPIContainer.get<any>(types.ingredientModule).init();
    publicAPIContainer.get<Server>(PublicApiTypes.publicApi).start();
  } catch (error) {
    process.exit(1);
  }
};

start();
