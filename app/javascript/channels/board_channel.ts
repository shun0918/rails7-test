import { Task } from '../types/models/Task';
import consumer from './consumer';

type _Mixin = {
  connected: () => void;
  disconnected: () => void;
  received: (data: { task: Task }) => void;
};

const createBoardChannel = ({ connected, disconnected, received }: _Mixin) => {
  consumer.subscriptions.create('BoardChannel', {
    connected,
    disconnected,
    received,
  });
};

export default createBoardChannel;
