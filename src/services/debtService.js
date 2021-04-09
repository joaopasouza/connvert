import { apiTwo } from './api';

export const getAllDebts = async () => {
  const { data } = await apiTwo.get('/divida', {
    params: { uuid: 'ea6e0883-2b37-4c1a-be1f-4c71f19352b9' },
  });
  return data;
};

export const insertDebt = async (request) => {
  const { data } = await apiTwo.post('/divida', request, {
    params: { uuid: 'ea6e0883-2b37-4c1a-be1f-4c71f19352b9' },
  });
  return data;
};

export const findDebt = async (id) => {
  const { data } = await apiTwo.get(`/divida/${id}`, {
    params: { uuid: 'ea6e0883-2b37-4c1a-be1f-4c71f19352b9' },
  });
  return data;
};

export const updateDebt = async (request) => {
  const { data } = await apiTwo.put(`/divida/${request.id}`, request, {
    params: {
      uuid: 'ea6e0883-2b37-4c1a-be1f-4c71f19352b9',
    },
  });
  return data;
};

export const deleteDebt = async (id) => {
  const { data } = await apiTwo.delete(`/divida/${id}`, {
    params: { uuid: 'ea6e0883-2b37-4c1a-be1f-4c71f19352b9' },
  });
  return data;
};
