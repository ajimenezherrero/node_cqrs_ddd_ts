import { Router } from 'express';
import { inject, injectable } from 'inversify';

import Controller from '../../../../shared/domain/Controller';
import { PublicApiTypes } from '../../../../types';

@injectable()
export class RecipeRouter {
  router: Router;

  constructor(
    @inject(PublicApiTypes.recipeController)
    controller: Controller,
  ) {
    this.router = Router();

    this.router.get('/:id', controller.show);
    this.router.get('/', controller.list);
  }
}
