import jsonServerApi from './api.js';

export const getExpenditureList = async () => {
  const response = await jsonServerApi.get('/expenditures');
  return response.data;
};

export const getExpenditure = async (expenditureId) => {
  const response = await jsonServerApi.get(`/expenditures/${expenditureId}`);
  return response.data;
};

export const createExpenditure = async (newExpenditure) => {
  await jsonServerApi.post(`/expenditures`, newExpenditure);
};

export const updateExpenditure = async ({ expenditureId, updatedExpenditure, }) => {
  await jsonServerApi.patch(`/expenditures/${expenditureId}`, updatedExpenditure);
};

export const deleteExpenditure = async (expenditureId) => {
  await jsonServerApi.delete(`/expenditures/${expenditureId}`);
};