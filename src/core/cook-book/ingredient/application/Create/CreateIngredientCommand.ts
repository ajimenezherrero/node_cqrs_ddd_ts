import { Command } from '../../../../../shared/domain/bus/Command/Command';
import { Uuid } from '../../../../../shared/domain/value-objects/Uuid';
import { IngredientProps } from '../../domain/Ingredient';

export class CreateIngredientCommand implements Command {
  eventId: Uuid;
  eventName: string;
  occurredOn: Date;
  body: IngredientProps;

  constructor(body: IngredientProps) {
    this.eventId = Uuid.generate();
    this.eventName = 'CreateIngredientCommand';
    this.occurredOn = new Date();
    this.body = body;
  }
}
