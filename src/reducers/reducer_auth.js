import axios from 'axios';

// Actions
const SIGNUP = 'something-more/auth/SIGNUP';

const ROOT_URL = 'http://localhost:1323/';

// Action Creators

// 회원 가입
export async function signUp(values) {

  let request;

  try {
    request = await axios({
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
    console.error(e.message);
  }

  return {
    type: SIGNUP,
    payload: request
  };
}

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case SIGNUP:
      const user = action.payload.data;
      const newState = { ...state };
      newState[user.id] = user;
      return newState;

    default:
      return state;
  }
}
