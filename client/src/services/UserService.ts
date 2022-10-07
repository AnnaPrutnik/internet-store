import { IUser } from '../model/IUser';

import instance from '../http';

class UserService {
  static async getUsers() {
    const { data } = await instance.get<IUser[]>('/user');
    return data;
  }
}

export default UserService;
