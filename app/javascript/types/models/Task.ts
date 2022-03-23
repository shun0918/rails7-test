import { Model } from '.';
import { Status } from './Status';
import { User } from './User';

export interface Task extends Model {
  title: string;
  status_id: Status['id'];
  user_id: User['id'];
  thumbnailUrl?: string;
}

export interface EditableTask extends Task {
  editable?: boolean;
}
