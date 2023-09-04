import { BaseModel } from './base.model';

export class UserModel extends BaseModel {
  static tableName = 'users';
  userName: number;
  password: number;
  status: number;
  role: number;
}
