import { inject, injectable } from 'inversify';

import { Uuid } from '../../../../../shared/domain/value-objects/Uuid';

import { CoreIngredientTypes } from '../../../../../types';
import { UseCase } from '../../../../../shared/domain/UseCase';
import { Ingredient } from '../../domain/Ingredient';
import { CommandHandler } from '../../../../../shared/domain/bus/Command/CommandHandler';
import { Command } from '../../../../../shared/domain/bus/Command/Command';
import { CreateIngredientCommand } from './CreateIngredientCommand';

@injectable()
export class CreateIngredientCommandHandler implements CommandHandler {
  id: string;
  topic = 'CreateIngredientCommand';
  private useCase: UseCase<Command, Ingredient>;

  constructor(@inject(CoreIngredientTypes.createIngredientUseCase) useCase: UseCase<Command, Ingredient>) {
    this.useCase = useCase;
    this.id = new Uuid().toString();
  }

  handle(command: CreateIngredientCommand): Promise<Ingredient> {
    return this.useCase.execute(command) as Promise<Ingredient>;
  }
}

export default CreateIngredientCommandHandler;
