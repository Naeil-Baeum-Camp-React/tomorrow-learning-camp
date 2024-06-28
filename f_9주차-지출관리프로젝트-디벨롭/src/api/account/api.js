import axios from 'axios';

const jwtCertificationServerApi = axios.create({
  baseURL: 'https://moneyfulpublicpolicy.co.kr',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});

jwtCertificationServerApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

jwtCertificationServerApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // 토큰이 만료된 경우 로그아웃 처리 또는 토큰 갱신 로직을 추가할 수 있습니다.
      localStorage.removeItem('accessToken');
      window.location.href = '/login'; // 로그인 페이지로 리디렉션
    }
    return Promise.reject(error);
  },
);

export default jwtCertificationServerApi;