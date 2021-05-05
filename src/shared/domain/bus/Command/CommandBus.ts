import { Command } from './Command';
import { Subscriber } from '../EventBus/Subscriber';

export interface CommandBus {
  dispatch(command: Command): void;
  addSubscriber(subscriber: Subscriber): void;
}
