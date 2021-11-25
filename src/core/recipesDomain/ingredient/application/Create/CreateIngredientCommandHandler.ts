import { inject, injectable } from 'inversify';

import { Uuid } from '../../../../../shared/domain/value-objects/Uuid';

import { CoreIngredientTypes } from '../../../../../types';
import { UseCase } from '../../../../../shared/domain/UseCase';
import { Ingredient } from '../../domain/Ingredient';
import { CommandHandler } from '../../../../../shared/domain/bus/Command/CommandHandler';
import { CreateIngredientCommand } from './CreateIngredientCommand';

@injectable()
export class CreateIngredientCommandHandler implements CommandHandler {
  id: string;
  topic = 'CreateIngredientCommand';
  private useCase: UseCase<Ingredient>;

  constructor(@inject(CoreIngredientTypes.createIngredientUseCase) useCase: UseCase<Ingredient>) {
    this.useCase = useCase;
    this.id = new Uuid().toString();
  }

  handle(command: CreateIngredientCommand): Promise<Ingredient> {
    const id = new Uuid(command.body.id);
    const name = command.body.name;
    const description = command.body.description;

    return this.useCase.execute(id, name, description) as Promise<Ingredient>;
  }
}

export default CreateIngredientCommandHandler;
