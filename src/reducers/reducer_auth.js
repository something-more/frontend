import axios from 'axios';

// Actions
const SIGNUP = 'something-more/auth/SIGNUP';
const LOGIN = 'something-more/auth/LOGIN';

// 설정 값
const ROOT_URL = 'http://localhost:1323/';

// Action Creators

// 회원 가입
export async function signUp(values) {

  let response, error = '';

  try {
    response = await axios({
      method: 'post',
      baseURL: ROOT_URL,
      url: '/signup/',
      data: {
        email: values.email,
        password: values.password
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      xsrfHeaderName: 'X-XSRF-TOKEN',
      xsrfCookieName: 'csrftoken',
      withCredentials: true
    });
  } catch (e) {
    error = e.response.data.message
  }

  return {
    type: SIGNUP,
    response: response,
    error: error
  };
}

// 로그인
export async function login(values) {

  let response, error = '';

  try {
    response = await axios({
      method: 'post',
      baseURL: ROOT_URL,
      url: '/login/',
      data: {
        email: values.email,
        password: values.password
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      xsrfHeaderName: 'X-XSRF-TOKEN',
      xsrfCookieName: 'csrftoken',
      withCredentials: true
    });
  } catch (e) {
    error = e.response.data.message
  }

  return {
    type: LOGIN,
    response: response,
    error: error
  }
}

// Reducer

// 초기 state 정의
const initialState = {
  email: '',
  error: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP:
      return reducerSignUp(state, action);

    case LOGIN:
      return reducerLogin(state, action);

    default:
      return state;
  }
}

// Reducer function
function reducerSignUp(state, action) {
  if (action.response) { // 응답이 정상일 경우
    return {
      ...state, // 전개 연산자: 기존 객체의 요소를 모두 재사용
      // state 의 내용을 덮어쓰게 됨
      email: action.response.data.email
    }
  } else { // 오류가 발생했을 경우
    return {
      ...state,
      error: action.error
    }
  }
}

function reducerLogin(state, action) {
  if (action.response) { // 응답이 정상일 경우
    // 전체 토큰에서 payload 부분만 잘라낸다
    const splitToken = action.response.data.split('.')[1];
    // base64로 인코딩된 payload 를 string 으로 디코딩
    const decodeToken = JSON.parse(window.atob(splitToken));

    // 사용자 데이터를 sessionStorage 에 저장
    sessionStorage.setItem('id', decodeToken.id);
    sessionStorage.setItem('email', decodeToken.email);
    sessionStorage.setItem('token', action.response.data);
    sessionStorage.setItem('expTime', String(decodeToken.exp));
    sessionStorage.setItem('isActive', decodeToken.isActive);

    // 기본 state 만 리턴
    return state

  } else { // 오류가 발생했을 경우
    return {
      ...state,
      error: action.error
    }
  }
}
