import axios from 'axios';
import { axiosConfig } from '../include/axios';

// axios 설정
axiosConfig(axios);

// Actions
const ADMIN_SIGNUP = 'something-more/auth/ADMIN_SIGNUP';
const SIGNUP = 'something-more/auth/SIGNUP';
const SIGNIN = 'something-more/auth/SIGNIN';
const SIGNOUT = 'something-more/auth/SIGNOUT';
const DESTROY = 'something-more/auth/DESTROY';

// Action Creators

// 관리자 회원 가입
export async function adminSignUp(values) {

  let response, error = '';

  try {
    response = await axios({
      method: 'post',
      url: '/admin/',
      data: {
        email: values.email,
        password: values.password
      }
    });
  } catch (e) {
    error = e.response.data.message
  }

  return {
    type: ADMIN_SIGNUP,
    response: response,
    error: error
  }
}

// 회원 가입
export async function signUp(values) {

  let response, error = '';

  try {
    response = await axios({
      method: 'post',
      url: '/sign-up/',
      data: {
        email: values.email,
        password: values.password
      }
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
      url: '/sign-in/',
      data: {
        email: values.email,
        password: values.password
      }
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

// 회원 탈퇴
export async function destroyUser(values) {

  let response, error = '';

  try {
    response = await axios({
      method: 'delete',
      url: '/destroy/',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
      data: {
        password: values.password
      }
    });
  } catch (e) {
    error = e.response.data.message;
  }

  return {
    type: DESTROY,
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
    case ADMIN_SIGNUP:
      return reducerAdminSignUp(state, action);

    case SIGNUP:
      return reducerSignUp(state, action);

    case SIGNIN:
      return reducerLogin(state, action);

    case SIGNOUT:
      return reducerSignOut(state);

    case DESTROY:
      return reducerDestroyUser(state, action);

    default:
      return state;
  }
}

// Reducer function
function reducerAdminSignUp(state, action) {
  if (action.response) {
    return {
      ...state,
      email: action.response.data.email,
      error: ''
    }
  } else {
    return {
      ...state,
      error: action.error
    }
  }
}

function reducerSignUp(state, action) {
  if (action.response) { // 응답이 정상일 경우
    return {
      ...state, // 전개 연산자: 기존 객체의 요소를 모두 재사용
      // state 의 내용을 덮어쓰게 됨
      email: action.response.data.email,
      error: ''
    }
  } else { // 오류가 발생했을 경우
    return {
      ...state,
      error: action.error
    }
  }
}

function reducerLogin(state, action) {
  if (action.response) {
    // 응답이 정상일 경우
    // 사용자 데이터를 sessionStorage 에 저장
    sessionStorage.setItem('token', action.response.data);

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

  // state 초기화
  return {
    ...state,
    email: '',
    error: ''
  }
}

function reducerDestroyUser(state, action) {
  if (!action.error) {
    sessionStorage.removeItem('token');

    return {
      ...state,
      email: '',
      error: ''
    }
  } else {
    return {
      ...state,
      error: action.error
    }
  }
}
