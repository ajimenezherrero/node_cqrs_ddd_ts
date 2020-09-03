import { Subscriber } from './Subscriber';
import { Event } from './Event';

export interface EventBus {
  subscribers: Map<string, Subscriber>;
  dispatch(event: Event): void;
  addSubscriber(subscriber: Subscriber): void;
  removeSubscriber(subscriber: Subscriber): void;
  listSubscribers(): Map<string, Subscriber>;
}