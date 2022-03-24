import { Model } from '.';

export interface Task extends Model {
  title: string;
  status_id: number;
  user_id: number;
  thumbnailUrl?: string;
}

export interface EditableTask extends Task {
  editable?: boolean;
}
