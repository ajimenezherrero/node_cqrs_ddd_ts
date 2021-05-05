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
};

export const PublicApiTypes = {
  publicApi: Symbol.for('PublicApi'),
  ingredientController: Symbol.for('IngredientController'),
  ingredientRouter: Symbol.for('IngredientRouter'),
  ingredientRepository: Symbol.for('IngredientRepository'),
};
