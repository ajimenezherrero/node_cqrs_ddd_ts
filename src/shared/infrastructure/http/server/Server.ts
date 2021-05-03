

interface App {
  use(): void;
  listen(port: Number): void;
}
export interface Server {
  app: App;
  start(): void;
}