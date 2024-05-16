import request from './';
import { FullUser } from './constants/user';

const UserService = {
  getUser: (id: number) => request<FullUser>(`/user/${id}`),
};

export default UserService;
