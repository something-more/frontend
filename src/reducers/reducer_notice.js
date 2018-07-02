import axios from 'axios';
import { axiosConfig } from '../include/axios';

// axios 설정
axiosConfig(axios);

// Actions
const CREATE = 'something-more/notice/CREATE';
const LIST = 'something-more/notice/LIST';
const COUNT = 'something-more/notice/COUNT';
const RETRIEVE = 'something-more/notice/RETRIEVE';
const PATCH = 'something-more/notice/PATCH';
const DESTROY = 'something-more/notice/DESTROY';

// Action Creators

// 공지사항 생성
export async function createNotice(formData) {

  let response, error = '';

  try {
    response = await axios({
      method: 'post',
      url: '/notice/',
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

// 공지사항 목록
export async function listNotice(query = '1') {

  let response, error = '';

  try {
    response = await axios({
      method: 'get',
      url: `/notice/list/?page=${query}`
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

// 공지사항 갯수
export async function countNotice() {

  let response, error = '';

  try {
    response = await axios({
      method: 'get',
      url: '/notice/count/'
    })
  } catch (e) {
    error = e.message;
  }

  return {
    type: COUNT,
    response: response,
    error: error
  }
}

// 공지사항 디테일
export async function retrieveNotice(id) {

  let response, error = '';

  try {
    response = await axios({
      method: 'get',
      url: `/notice/view/${id}`
    })
  } catch (e) {
    error = e.message;
  }

  return {
    type: RETRIEVE,
    response: response,
    error: error
  }
}

// 공지사항 수정
export async function patchNotice(formData, id) {

  let response, error = '';

  try {
    response = await axios({
      method: 'patch',
      url: `/notice/${id}`,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
      data: formData
    });
  } catch (e) {
    error = e.message;
  }

  return {
    type: PATCH,
    response: response,
    error: error
  }
}

// 공지사항 삭제
export async function destroyNotice(id) {

  let response, error = '';

  try {
    response = await axios({
      method: 'delete',
      url: `/notice/${id}`,
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    });
  } catch (e) {
    error = e.message;
  }

  return {
    type: DESTROY,
    response: response,
    error: error
  }
}

// Initial State
const initialState = {
  list: [],
  retrieve: {},
  count: 0,
  error: ''
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE:
      return reducerCreateNotice(action, state);

    case LIST:
      return reducerListNotice(action, state);

    case COUNT:
      return reducerCountNotice(action, state);

    case RETRIEVE:
      return reducerRetrieveNotice(action, state);

    case PATCH:
      return reducerPatchNotice(action, state);

    case DESTROY:
      return reducerDestroyNotice(action, state);

    default:
      return state;
  }
}

// Reducer Functions
function reducerCreateNotice(action, state) {
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

function reducerListNotice(action, state) {
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

function reducerCountNotice(action, state) {
  if (action.response) {
    return {
      ...state,
      count: action.response.data,
      error: ''
    }
  } else {
    return {
      ...state,
      count: 0,
      error: action.error
    }
  }
}

function reducerRetrieveNotice(action, state) {
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

function reducerPatchNotice(action, state) {
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

function reducerDestroyNotice(action, state) {
  if (!action.error) {
    return {
      ...state,
      retrieve: {},
      error: ''
    }
  } else {
    return {
      ...state,
      error: action.error
    }
  }
}
