import { Uuid } from '../value-objects/Uuid';

export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): Uuid;
}
