import { ErrorRequestHandler, Request, Response } from 'express';
import { Logger } from "../../logger/Logger";

interface GenericError extends Error {
  statusCode: number;
}

class ErrorManager {
  logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  errorManagement(): ErrorRequestHandler {
    return (err: GenericError, req: Request, res: Response): void => {
      const { statusCode = 500, message = '' } = err;

      this.logger.error(message);

      res.status(statusCode).json({ error: message });
    };
  }
}

export default ErrorManager;
