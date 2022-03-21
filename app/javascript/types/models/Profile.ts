import { Model } from '.';

export interface Profile extends Model {
  user_id?: number;
  image_id?: number;
  name?: string;
  bio?: string;
  phone?: string;
}
