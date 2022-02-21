import { IDomainEvent } from './events/IDomainEvent';

export abstract class AggregateRoot {
  private domainEvents: IDomainEvent[] = [];

  public pullDomainEvents(): IDomainEvent[] {
    const domainEvents = this.domainEvents;

    this.domainEvents = [];

    return domainEvents;
  }

  protected record(domainEvent: IDomainEvent): void {
    this.domainEvents.push(domainEvent);
  }
}
