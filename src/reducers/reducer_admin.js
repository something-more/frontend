import axios from 'axios';
import { axiosConfig } from '../include/axios';

// axios 설정
axiosConfig(axios);

// Actions
const LIST = 'something-more/admin/LIST';

// Action Creators

// 유저 리스트
export async function listUsers() {

  let response, error = '';

  try {
    response = await axios({
      method: 'get',
      url: '/users/',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    });
  } catch (e) {
    error = e.response.data.message;
  }

  return {
    type: LIST,
    response: response,
    error: error
  }
}

// Initial State
const initialState = {
  list: [],
  retrieve: {},
  error: ''
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST:
      return reducerListUsers(state, action);

    default:
      return state;
  }
}

// Reducer Functions
function reducerListUsers(state, action) {
  if (action.response) {
    return {
      ...state,
      list: action.response.data,
      error: ''
    }
  } else {
    return {
      ...state,
      list: [],
      error: action.error
    }
  }
}
