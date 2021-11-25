import { Command } from '../../../../../shared/domain/bus/Command/Command';
import { Uuid } from '../../../../../shared/domain/value-objects/Uuid';

type IngredientBody = {
  id: string;
  name: string;
  description: string;
};

export class CreateIngredientCommand implements Command {
  eventId: Uuid;
  eventName: string;
  occurredOn: Date;
  body: IngredientBody;

  constructor(body: IngredientBody) {
    this.eventId = Uuid.generate();
    this.eventName = 'CreateIngredientCommand';
    this.occurredOn = new Date();
    this.body = body;
  }
}
