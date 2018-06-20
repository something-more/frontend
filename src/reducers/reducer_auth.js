import axios from 'axios';

// Actions
export const SIGNUP = 'something-more/auth/SIGNUP';

const ROOT_URL = 'http://localhost:1323/';

// Action Creators
export function signUp(values) {
  const request = axios({
    method: 'post',
    url: `${ROOT_URL}signup/`,
    data: {
      email: values.email,
      password: values.password
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return {
    type: SIGNUP,
    payload: request
  };
}

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case SIGNUP:
      return action.payload;

    default:
      return state;
  }
}
