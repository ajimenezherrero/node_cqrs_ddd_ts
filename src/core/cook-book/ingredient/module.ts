import { ContainerModule, interfaces, inject, injectable } from "inversify";
import { IngredientRepository } from "./domain/IngredientRepository";
import { IngredientPGRepository } from "./infrastructure/persistence/IngredientPGRepository";
import { QueryHandler } from "../../../shared/domain/bus/Query/QueryHandler";
import GetIngredientQueryHandler from "./application/Read/GetIngredientQueryHandler";
import { GetIngredientUseCase } from "./application/Read/GetIngredientUseCase";
import { UseCase } from "../../../shared/domain/UseCase";
import { Query } from "../../../shared/domain/bus/Query/Query";
import { QueryBus } from "../../../shared/domain/bus/Query/QueryBus";

import { BootstrapTypes, CoreIngredientTypes } from "../../../types";
import { Module } from "../../../shared/domain/Module";

@injectable()
export class IngredientModule implements Module {
  queryBus: QueryBus;
  queryHandlers: Array<QueryHandler>;

  constructor(@inject(BootstrapTypes.QueryBus) queryBus: QueryBus, @inject(CoreIngredientTypes.ingredientHandlers) queryHandlers: Array<QueryHandler>) {
    this.queryBus = queryBus;
    this.queryHandlers = queryHandlers;
  }

  init() {
    this.queryHandlers.forEach(queryHandler => {
      this.queryBus.bus.addSubscriber(queryHandler);
    })
  }
}

const handlers = (context: interfaces.Context): Array<QueryHandler> => {
  return [
    context.container.get<QueryHandler>(CoreIngredientTypes.getIngredientQueryHandler)
  ];
}

const containerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<Module>(CoreIngredientTypes.ingredientModule).to(IngredientModule);
  bind<IngredientRepository>(CoreIngredientTypes.ingredientRepository).to(IngredientPGRepository);
  bind<QueryHandler>(CoreIngredientTypes.getIngredientQueryHandler).to(GetIngredientQueryHandler);
  bind<Array<QueryHandler>>(CoreIngredientTypes.ingredientHandlers).toDynamicValue(handlers);
  bind<UseCase<Query, any>>(CoreIngredientTypes.getIngredientUseCase).to(GetIngredientUseCase);
});

export default containerModule;
