import { Query } from '../../../../../shared/domain/bus/Query/Query';
import { Uuid } from '../../../../../shared/domain/value-objects/Uuid';

export class GetIngredientQuery implements Query {
  id: Uuid;
  eventId: Uuid;
  eventName: string;
  occurredOn: Date;

  constructor(id: Uuid) {
    this.id = id;
    this.eventId = Uuid.generate();
    this.eventName = 'GetIngredientQuery';
    this.occurredOn = new Date();
  }
}
