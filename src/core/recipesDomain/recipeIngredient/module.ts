import { ContainerModule, interfaces, inject, injectable } from 'inversify';
import { RecipeIngredientRepository } from './domain/RecipeIngredientRepository';
import { RecipeIngredientPGRepository } from './infrastructure/persistence/RecipeIngredientPGRepository';
import { QueryHandler } from '../../../shared/domain/bus/Query/QueryHandler';
import GetIngredientQueryHandler from './application/Read/GetRecipeIngredientQueryHandler';
import { GetIngredient } from './application/Read/GetRecipeIngredient';
import { UseCase } from '../../../shared/domain/UseCase';
import { QueryBus } from '../../../shared/domain/bus/Query/QueryBus';

import { BootstrapTypes, CoreIngredientTypes } from '../../../types';
import { Module } from '../../../shared/domain/Module';
import { RecipeIngredient } from './domain/RecipeIngredient';
import { CommandBus } from '../../../shared/domain/bus/Command/CommandBus';
import { CommandHandler } from '../../../shared/domain/bus/Command/CommandHandler';
import IngredientFinder from './domain/RecipeIngredientFinder';

@injectable()
export class RecipeIngredientModule implements Module {
  public queryBus: QueryBus;
  public commandBus: CommandBus;
  public queryHandlers: QueryHandler[];
  public commandHandlers: CommandHandler[];

  constructor(
    @inject(BootstrapTypes.QueryBus) queryBus: QueryBus,
    @inject(BootstrapTypes.CommandBus) commandBus: CommandBus,
    @inject(CoreIngredientTypes.ingredientQueryHandlers)
    queryHandlers: QueryHandler[],
    @inject(CoreIngredientTypes.ingredientCommandHandlers)
    commandHandlers: QueryHandler[],
  ) {
    this.queryBus = queryBus;
    this.commandBus = commandBus;
    this.queryHandlers = queryHandlers;
    this.commandHandlers = commandHandlers;
  }

  public init(): void {
    this.queryHandlers.forEach((queryHandler) => {
      this.queryBus.addSubscriber(queryHandler);
    });

    this.commandHandlers.forEach((commandHandler) => {
      this.commandBus.addSubscriber(commandHandler);
    });
  }
}

const queryHandlers = (context: interfaces.Context): QueryHandler[] => {
  return [context.container.get<QueryHandler>(CoreIngredientTypes.getIngredientQueryHandler)];
};

const commandHandlers = (context: interfaces.Context): CommandHandler[] => {
  return [context.container.get<CommandHandler>(CoreIngredientTypes.createIngredientCommandHandler)];
};

const containerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<Module>(CoreIngredientTypes.recipeIngredientModule).to(RecipeIngredientModule);
  bind<IngredientRepository>(CoreIngredientTypes.ingredientRepository).to(IngredientPGRepository).inSingletonScope();
  bind<QueryHandler>(CoreIngredientTypes.getIngredientQueryHandler).to(GetIngredientQueryHandler);
  bind<QueryHandler[]>(CoreIngredientTypes.ingredientQueryHandlers).toDynamicValue(queryHandlers);
  bind<CommandHandler>(CoreIngredientTypes.createIngredientCommandHandler).to(CreateIngredientCommandHandler);
  bind<CommandHandler[]>(CoreIngredientTypes.ingredientCommandHandlers).toDynamicValue(commandHandlers);
  bind<UseCase<Ingredient>>(CoreIngredientTypes.getIngredientUseCase).to(GetIngredient);
  bind<IngredientFinder>(CoreIngredientTypes.ingredientFinder).to(IngredientFinder);
});

export default containerModule;
