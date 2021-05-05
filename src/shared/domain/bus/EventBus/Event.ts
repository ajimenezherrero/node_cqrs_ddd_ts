import { Uuid } from '../../value-objects/Uuid';

export interface Event {
  eventId: Uuid;
  occurredOn: Date;
  eventName: string;
  body?: object;
}
