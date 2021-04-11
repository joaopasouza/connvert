import { apiTwo } from './api';

export const getAllDebts = async () => {
  const { data } = await apiTwo.get('/divida');
  return data;
};

export const insertDebt = async (request) => {
  const { data } = await apiTwo.post('/divida', request);
  return data;
};

export const findDebt = async (id) => {
  const { data } = await apiTwo.get(`/divida/${id}`);
  return data;
};

export const updateDebt = async (request) => {
  const { data } = await apiTwo.put(`/divida/${request.id}`, request);
  return data;
};

export const deleteDebt = async (id) => {
  const { data } = await apiTwo.delete(`/divida/${id}`);
  return data;
};
