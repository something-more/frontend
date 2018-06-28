import axios from 'axios';
import { axiosConfig } from '../include/axios';

// axios 설정
axiosConfig(axios);

// Actions
const CREATE = 'something-more/board/CREATE';
const LIST = 'something-more/board/LIST';

// Action Creators

// 글 생성
export async function createBoard(formData) {

  let response, error = '';

  try {
    response = await axios({
      method: 'post',
      url: '/board/',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
      data: formData
    })
  } catch (e) {
    error = e.message;
  }

  return {
    type: CREATE,
    response: response,
    error: error
  }
}

// 글 목록
export async function listBoard() {

  let response, error = '';

  try {
    response = await axios({
      method: 'get',
      url: '/board/list/'
    })
  } catch (e) {
    error = e.message;
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
    case CREATE:
      return reducerCreateBoard(action, state);

    case LIST:
      return reducerListBoard(action, state);

    default:
      return state;
  }
}

// Reducer Functions
function reducerCreateBoard(action, state) {
  if (action.response) {
    return {
      ...state,
      retrieve: action.response.data,
      error: ''
    }
  } else {
    return {
      ...state,
      retrieve: {},
      error: action.error
    }
  }
}

function reducerListBoard(action, state) {
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
