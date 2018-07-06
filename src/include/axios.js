// axios 설정
export default function axiosConfig(payload) {
  const axios = payload;
  axios.defaults.baseURL = 'http://localhost:1323/';
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token';
  axios.defaults.xsrfCookieName = '_csrf';
  axios.defaults.withCredentials = true;
}
