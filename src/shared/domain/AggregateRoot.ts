import { Entity } from './Entity';
import { IDomainEvent } from './events/IDomainEvent';
import { Uuid } from './value-objects/Uuid';

export abstract class AggregateRoot<T> extends Entity<T> {
  private domainEvents: IDomainEvent[] = [];

  get id(): Uuid {
    return this._id;
  }

  public pullDomainEvents(): IDomainEvent[] {
    const domainEvents = this.domainEvents;

    this.domainEvents = [];

    return domainEvents;
  }

  protected record(domainEvent: IDomainEvent): void {
    this.domainEvents.push(domainEvent);
  }
}
