import { ContainerModule, interfaces } from 'inversify';
import { Router } from 'express';

import Controller from '../../../shared/domain/Controller';
import Server from '../../../shared/domain/Server';
import PublicApi from './';
import { PublicApiTypes } from '../../../types';
import IngredientController from './controllers/ingredient';
import IngredientRouter from './routers/ingredient';
import { RecipeController } from './controllers/recipe';
import { RecipeRouter } from './routers/recipe';

const module = new ContainerModule((bind: interfaces.Bind) => {
  bind<Controller>(PublicApiTypes.ingredientController).to(IngredientController);
  bind<Controller>(PublicApiTypes.recipeController).to(RecipeController);
  bind<Router>(PublicApiTypes.ingredientRouter).toDynamicValue(
    (context: interfaces.Context) =>
      new IngredientRouter(context.container.get<IngredientController>(PublicApiTypes.ingredientController)).router,
  );
  bind<Router>(PublicApiTypes.recipeRouter).toDynamicValue(
    (context: interfaces.Context) =>
      new RecipeRouter(context.container.get<RecipeController>(PublicApiTypes.recipeController)).router,
  );
  bind<Server>(PublicApiTypes.publicApi).to(PublicApi);
});

export default module;
