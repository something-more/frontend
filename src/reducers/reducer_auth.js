import axios from 'axios';

// Actions
const SIGNUP = 'something-more/auth/SIGNUP';
const SIGNIN = 'something-more/auth/SIGNIN';
const SIGNOUT = 'something-more/auth/SIGNOUT';

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
      url: '/sign-up/',
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
export async function signIn(values) {

  let response, error = '';

  try {
    response = await axios({
      method: 'post',
      baseURL: ROOT_URL,
      url: '/sign-in/',
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
    type: SIGNIN,
    response: response,
    error: error
  }
}

// 로그아웃
export function signOut() {
  return {
    type: SIGNOUT
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

    case SIGNIN:
      return reducerLogin(state, action);

    case SIGNOUT:
      return reducerSignOut(state);

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
    sessionStorage.setItem('token', action.response.data);
    sessionStorage.setItem('user_data', JSON.stringify(decodeToken));

    // 오류 메시지 삭제
    return {
      ...state,
      error: ''
    }

  } else { // 오류가 발생했을 경우
    return {
      ...state,
      error: action.error
    }
  }
}

function reducerSignOut(state) {
  // 사용자 데이터를 삭제
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user_data');

  // state 초기화
  return {
    ...state,
    email: '',
    error: ''
  }
}
