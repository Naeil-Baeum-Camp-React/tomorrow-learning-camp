import jwtCertificationServerApi from './api.js';

export const register = async (newAccount) => {
  await jwtCertificationServerApi.post('/register', newAccount);
};

export const login = async (account) => {
  const response = await jwtCertificationServerApi.post('/login', account);
  return response.data;
};

export const getMyInfo = async () => {
  const response = await jwtCertificationServerApi.get('/user');
  return response.data;
};

export const updateNickname = async (newNickname) => {
  const response = await jwtCertificationServerApi.patch('/profile', { nickname: newNickname });
  return response.data;
};
