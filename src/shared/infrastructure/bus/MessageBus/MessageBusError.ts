class MessageBusError extends Error {
  options: unknown;

  constructor(message: string, options = {}) {
    super(`Message Bus Error: ${message}`);
    this.options = options;
  }

  get statusCode(): number {
    return 500;
  }
}

export default MessageBusError;
