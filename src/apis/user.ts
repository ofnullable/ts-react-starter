import { AxiosPromise } from 'axios';
import api from './index';
import { User } from '../interfaces/models';

export const loadUserApi = (id: string): AxiosPromise<User> => {
  return api.get(`/users/${id}`);
};

export const loadUsersApi = (): AxiosPromise<User> => {
  return api.get(`/users`);
};
