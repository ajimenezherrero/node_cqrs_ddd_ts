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
  ingredientHandlers: Symbol.for('ingredientHandlers'),
  getIngredientUseCase: Symbol.for('getIngredientUseCase'),
};

export const PublicApiTypes = {
  publicApi: Symbol.for('PublicApi'),
  ingredientController: Symbol.for('IngredientController'),
  ingredientRouter: Symbol.for('IngredientRouter'),
  ingredientRepository: Symbol.for('IngredientRepository'),
};
