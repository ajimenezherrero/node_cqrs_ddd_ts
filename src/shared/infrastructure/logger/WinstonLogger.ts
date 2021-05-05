import winston from "winston";

class WinstonLogger {
  instance: any;
  loggerLevel: string = "debug";

  constructor(loggerLevel: string) {
    this.loggerLevel = loggerLevel;
  }

  get logger() {
    if (!this.instance) {
      this.instance = winston.createLogger({
        level: this.loggerLevel,
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.simple()
            ),
          }),
        ],
      });
    }

    return this.instance;
  }
}

export default WinstonLogger;
