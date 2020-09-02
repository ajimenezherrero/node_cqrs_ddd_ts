import Container from './Container';
import Config from '../configuration/Config';

class Bootstrap {
  config: object;
  container: any;

  constructor() {
    this.config = new Config().getConfig();
    this.container = new Container();
  }
}

export default Bootstrap;