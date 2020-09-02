class Config {
  config: object;

  constructor() {
    this.config = {};
  }

  getConfig(): object {
    return this.config;
  }
}

export default Config;