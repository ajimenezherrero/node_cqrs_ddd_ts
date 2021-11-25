import { Query } from '../../../../../shared/domain/bus/Query/Query';
import { Uuid } from '../../../../../shared/domain/value-objects/Uuid';

export class GetAllRecipesQuery implements Query {
  eventId: Uuid;
  eventName: string;
  occurredOn: Date;

  constructor() {
    this.eventId = Uuid.generate();
    this.eventName = 'GetAllRecipesQuery';
    this.occurredOn = new Date();
  }
}
