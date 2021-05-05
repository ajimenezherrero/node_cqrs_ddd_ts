const {
  POSTGRES_USER,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  LOGGER_LEVEL,
  APP_PORT,
  BACKOFFICE_PORT,
} = process.env;

type applicationConfig = {
  port: number;
};

export type Config = {
  applications: {
    backoffice: applicationConfig;
    apiRest: applicationConfig;
  };
  loggerLevel: string;
  postgres: {
    database: string;
    host: string;
    max: number;
    password: string;
    port: number;
    user: string;
  };
};

export const configuration: Config = {
  applications: {
    apiRest: {
      port: Number(APP_PORT),
    },
    backoffice: {
      port: Number(BACKOFFICE_PORT),
    },
  },
  loggerLevel: LOGGER_LEVEL || "",
  postgres: {
    database: POSTGRES_DB || "",
    host: POSTGRES_HOST || "postgres",
    max: 10,
    password: POSTGRES_PASSWORD || "",
    port: Number(POSTGRES_PORT) || 5432,
    user: POSTGRES_USER || "postgres",
  },
};
