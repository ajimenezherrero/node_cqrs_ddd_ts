import { Container } from 'inversify';
import 'reflect-metadata';

import { PublicApiContainer } from './apps/api-rest/public';
import IngredientModule from './core/recipesDomain/ingredient/module';
import { Bootstrap } from './shared/infrastructure/bootstrap/Bootstrap';
import Server from './shared/domain/Server';
import { CoreIngredientTypes, PublicApiTypes } from './types';
import { Module } from './shared/domain/Module';

const start = async () => {
  try {
    const ApplicationContainer = new Container();
    const bootstrap = new Bootstrap();

    ApplicationContainer.load(bootstrap.container, IngredientModule, PublicApiContainer);

    ApplicationContainer.get<Module>(CoreIngredientTypes.ingredientModule).init();
    ApplicationContainer.get<Server>(PublicApiTypes.publicApi).start();
  } catch (error) {
    process.exit(1);
  }
};

start();
