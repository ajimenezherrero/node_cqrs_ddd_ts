class MessageBusError extends Error {
  name: string = 'MessageBusError';
  options: object;

  constructor(message: string, options = {}) {
    super(`Message Bus Error: ${message}`);
    this.options = options;
  }

  get statusCode() {
    return 500;
  }
}

export default MessageBusError;
