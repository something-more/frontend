import axios from 'axios';
import axiosConfig from '../include/axios';

// axios 설정
axiosConfig(axios);

// Actions
const LIST = 'something-more/admin/LIST';
const UPDATE = 'something-more/admin/UPDATE';
const FORCE_DESTROY = 'something-more/admin/FORCE_DESTORY';

// Action Creators

// 유저 리스트
export async function listUsers() {
  let response = '';
  let error = '';

  try {
    response = await axios({
      method: 'get',
      url: '/users/',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  } catch (e) {
    error = e.response.data.message;
  }

  return {
    type: LIST,
    response,
    error,
  };
}

export async function updateUserAuth(payload) {
  let response = '';
  let error = '';

  try {
    response = await axios({
      method: 'patch',
      url: `/users/${payload.email}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      data: {
        is_admin: payload.is_admin,
        is_staff: payload.is_staff,
      },
    });
  } catch (e) {
    error = e.response.data.message;
  }

  return {
    type: UPDATE,
    response,
    error,
  };
}

export async function forceDestroyUser(payload) {
  let response = '';
  let error = '';

  try {
    response = await axios({
      method: 'delete',
      url: `/users/${payload}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  } catch (e) {
    error = e.message;
  }

  return {
    type: FORCE_DESTROY,
    response,
    error,
  };
}

// Initial State
const initialState = {
  list: [],
  retrieve: {},
  error: '',
};

// Reducer Functions
function reducerListUsers(state, action) {
  if (action.response) {
    return {
      ...state,
      list: action.response.data,
      error: '',
    };
  }
  return {
    ...state,
    list: [],
    error: action.error,
  };
}

function reducerUpdateUserAuth(state, action) {
  if (!action.error) {
    return {
      ...state,
      error: '',
    };
  }
  return {
    ...state,
    error: action.error,
  };
}

function reducerForceDestroyUser(state, action) {
  if (!action.error) {
    return {
      ...state,
      retrieve: {},
      error: '',
    };
  }
  return {
    ...state,
    error: action.error,
  };
}

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST:
      return reducerListUsers(state, action);

    case UPDATE:
      return reducerUpdateUserAuth(state, action);

    case FORCE_DESTROY:
      return reducerForceDestroyUser(state, action);

    default:
      return state;
  }
}
