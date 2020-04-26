import api from './index';

export const loadUserApi = (id: number) => {
  return api.get(`/users/${id}`);
};

export const loadUsersApi = () => {
  return api.get(`/users`);
};