import { Bootstrap } from './shared/infrastructure/bootstrap/Bootstrap';

const start = async () => {
  try {
    const bootstrap = new Bootstrap();

  } catch (error) {
    process.exit(1);
  }
};

start();