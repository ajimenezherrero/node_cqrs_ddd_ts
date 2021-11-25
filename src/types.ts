export const BootstrapTypes = {
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  Postgres: Symbol.for('Postgres'),
  QueryBus: Symbol.for('QueryBus'),
  CommandBus: Symbol.for('CommandBus'),
};

export const CoreIngredientTypes = {
  ingredientModule: Symbol.for('ingredientModule'),
  ingredientRepository: Symbol.for('ingredientRepository'),
  getIngredientQueryHandler: Symbol.for('getIngredientQueryHandler'),
  createIngredientCommandHandler: Symbol.for('createIngredientCommandHandler'),
  ingredientQueryHandlers: Symbol.for('ingredientQueryHandlers'),
  ingredientCommandHandlers: Symbol.for('ingredientCommandHandlers'),
  getIngredientUseCase: Symbol.for('getIngredientUseCase'),
  createIngredientUseCase: Symbol.for('createIngredientUseCase'),
  ingredientFinder: Symbol.for('ingredientFinder'),
};

export const CoreRecipeTypes = {
  recipeModule: Symbol.for('recipeModule'),
  recipeRepository: Symbol.for('recipeRepository'),
  recipeFinder: Symbol.for('recipeFinder'),
  recipeQueryHandlers: Symbol.for('recipeQueryHandlers'),
  getAllRecipesQueryHandler: Symbol.for('getAllRecipesQueryHandler'),
  getFullRecipeQueryHandler: Symbol.for('getFullRecipeQueryHandler'),
  getAllRecipesUseCase: Symbol.for('getAllRecipesUseCase'),
  getFullRecipeUseCase: Symbol.for('getFullRecipeUseCase'),
};

export const PublicApiTypes = {
  publicApi: Symbol.for('PublicApi'),
  ingredientController: Symbol.for('IngredientController'),
  ingredientRouter: Symbol.for('IngredientRouter'),
  ingredientRepository: Symbol.for('IngredientRepository'),
};
