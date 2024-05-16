import request from '.';
import { User } from './constants/user';

/** Services for handling user auth and account related settings. */
const AuthServices = {
  refreshUser: () => request<User>('/user/login'),
};

export default AuthServices;
