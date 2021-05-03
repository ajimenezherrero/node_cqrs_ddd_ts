import { Event } from "./Event";

export interface Subscriber {
  id: string;
  topic: string;
  handle(event: Event): void;
}
