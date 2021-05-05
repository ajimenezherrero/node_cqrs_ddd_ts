import { Container } from "inversify";
import "reflect-metadata";

import { PublicApiContainer } from "./apps/api-rest/public";
import IngredientModule from "./core/cook-book/ingredient/module";
import { Bootstrap } from "./shared/infrastructure/bootstrap/Bootstrap";
import Server from "./shared/domain/Server";
import { CoreIngredientTypes, PublicApiTypes } from './types';

const start = async () => {
  try {
    const ApplicationContainer = new Container();
    const bootstrap = new Bootstrap();

    ApplicationContainer.load(bootstrap.container, IngredientModule, PublicApiContainer);

    ApplicationContainer.get<any>(CoreIngredientTypes.ingredientModule).init();
    ApplicationContainer.get<Server>(PublicApiTypes.publicApi).start();
  } catch (error) {
    process.exit(1);
  }
};

start();
