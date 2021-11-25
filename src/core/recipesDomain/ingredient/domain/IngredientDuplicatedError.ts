class IngredientDuplicatedError extends Error {
  statusCode = 409;

  constructor() {
    super('Ingredient duplicated');
  }
}

export default IngredientDuplicatedError;
