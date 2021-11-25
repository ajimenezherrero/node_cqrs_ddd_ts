import { ContainerModule, interfaces, inject, injectable } from 'inversify';

import { QueryBus } from '../../../shared/domain/bus/Query/QueryBus';
import { QueryHandler } from '../../../shared/domain/bus/Query/QueryHandler';
import { Module } from '../../../shared/domain/Module';
import { UseCase } from '../../../shared/domain/UseCase';
import { BootstrapTypes, CoreRecipeTypes } from '../../../types';

import { GetAllRecipes } from './application/Read/GetAllRecipes';
import { GetAllRecipesQueryHandler } from './application/Read/GetAllRecipesQueryHandler';
import { GetFullRecipe } from './application/Read/GetFullRecipe';
import { GetFullRecipeQueryHandler } from './application/Read/GetFullRecipeQueryHandler';

import { Recipe } from './domain/Recipe';
import { RecipeFinder } from './domain/RecipeFinder';
import { RecipeRepository } from './domain/RecipeRepository';

import { RecipePGRepository } from './infrastructure/persistence/RecipePGRepository';

@injectable()
export class RecipeModule implements Module {
  public queryBus: QueryBus;
  public queryHandlers: QueryHandler[];

  constructor(
    @inject(BootstrapTypes.QueryBus) queryBus: QueryBus,
    @inject(CoreRecipeTypes.recipeQueryHandlers)
    queryHandlers: QueryHandler[],
  ) {
    this.queryBus = queryBus;
    this.queryHandlers = queryHandlers;
  }

  public init(): void {
    this.queryHandlers.forEach((queryHandler) => {
      this.queryBus.addSubscriber(queryHandler);
    });
  }
}

const queryHandlers = (context: interfaces.Context): QueryHandler[] => {
  return [
    context.container.get<QueryHandler>(CoreRecipeTypes.getAllRecipesQueryHandler),
    context.container.get<QueryHandler>(CoreRecipeTypes.getFullRecipeQueryHandler),
  ];
};

const containerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<Module>(CoreRecipeTypes.recipeModule).to(RecipeModule);
  bind<RecipeRepository>(CoreRecipeTypes.recipeRepository).to(RecipePGRepository).inSingletonScope();
  bind<RecipeFinder>(CoreRecipeTypes.recipeFinder).to(RecipeFinder);

  bind<QueryHandler[]>(CoreRecipeTypes.recipeQueryHandlers).toDynamicValue(queryHandlers);
  bind<QueryHandler>(CoreRecipeTypes.getAllRecipesQueryHandler).to(GetAllRecipesQueryHandler);
  bind<QueryHandler>(CoreRecipeTypes.getFullRecipeQueryHandler).to(GetFullRecipeQueryHandler);
  
  bind<UseCase<Recipe[]>>(CoreRecipeTypes.getAllRecipesUseCase).to(GetAllRecipes);
  bind<UseCase<Recipe>>(CoreRecipeTypes.getFullRecipeUseCase).to(GetFullRecipe);
});

export default containerModule;
