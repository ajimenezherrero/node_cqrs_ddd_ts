export class RecipeNotFoundError extends Error {
  statusCode = 404;

  constructor() {
    super('Recipe not found');
  }
}
