import { Handler } from 'express';

export default interface Controller {
  create: Handler;
  list: Handler;
  show: Handler;
  update: Handler;
  delete: Handler;
}
