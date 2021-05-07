class IngredientNotFoundError extends Error {
  statusCode = 404;

  constructor() {
    super('Ingredient not found');
  }
}

export default IngredientNotFoundError;