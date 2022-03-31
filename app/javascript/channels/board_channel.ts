import { Task } from '../types/models/Task';
import consumer from './consumer';

const BoardChannel = consumer.subscriptions.create('BoardChannel', {
  connected() {},
  disconnected() {},
  received(data: { task: Task; destroyed?: boolean; index?: number }) {},
});
export default BoardChannel;
