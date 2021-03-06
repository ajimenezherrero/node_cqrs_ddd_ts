import { ContainerModule, interfaces } from 'inversify';
import { Router } from 'express';

import Controller from '../../../shared/domain/Controller';
import Server from '../../../shared/domain/Server';
import PublicApi from './';
import { PublicApiTypes } from '../../../types';
import IngredientController from './controllers/ingredient';
import IngredientRouter from './routers/ingredient';

const module = new ContainerModule((bind: interfaces.Bind) => {
  bind<Controller>(PublicApiTypes.ingredientController).to(IngredientController);
  bind<Router>(PublicApiTypes.ingredientRouter).toDynamicValue(
    (context: interfaces.Context) =>
      new IngredientRouter(context.container.get<IngredientController>(PublicApiTypes.ingredientController)).router,
  );
  bind<Server>(PublicApiTypes.publicApi).to(PublicApi);
});

export default module;
