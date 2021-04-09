import { apiOne } from './api';

export const getAllUsers = async () => {
  const { data } = await apiOne.get('/users');
  return data;
};
