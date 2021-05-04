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

@injectable()
export class Module {
  queryBus: QueryBus;
  getIngredientHandler: QueryHandler;

  constructor(@inject(BootstrapTypes.QueryBus) queryBus: QueryBus, @inject(CoreIngredientTypes.getIngredientQueryHandler) handler: QueryHandler) {
    this.queryBus = queryBus;
    this.getIngredientHandler = handler;
  }

  init() {
    this.queryBus.bus.addSubscriber(this.getIngredientHandler);
  }
}

const containerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<any>(CoreIngredientTypes.ingredientModule).to(Module);
  bind<IngredientRepository>(CoreIngredientTypes.ingredientRepository).to(IngredientPGRepository);
  bind<QueryHandler>(CoreIngredientTypes.getIngredientQueryHandler).to(GetIngredientQueryHandler);
  bind<UseCase<Query, any>>(CoreIngredientTypes.getIngredientUseCase).to(GetIngredientUseCase);
});

export default containerModule;
