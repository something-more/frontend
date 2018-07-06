import axios from 'axios';
import axiosConfig from '../include/axios';

// axios 설정
axiosConfig(axios);

// Actions
const CREATE = 'something-more/board/CREATE';
const LIST = 'something-more/board/LIST';
const COUNT = 'something-more/board/COUNT';
const RETRIEVE = 'something-more/board/RETRIEVE';
const PATCH = 'something-more/board/PATCH';
const DESTROY = 'something-more/board/DESTROY';

// Action Creators

// 글 생성
export async function createBoard(formData) {
  let response = '';
  let error = '';

  try {
    response = await axios({
      method: 'post',
      url: '/board/',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      data: formData,
    });
  } catch (e) {
    error = e.message;
  }

  return {
    type: CREATE,
    response,
    error,
  };
}

// 글 목록
export async function listBoard(query = '1') {
  let response = '';
  let error = '';

  try {
    response = await axios({
      method: 'get',
      url: `/board/list/?page=${query}`,
    });
  } catch (e) {
    error = e.message;
  }

  return {
    type: LIST,
    response,
    error,
  };
}

// 글 갯수
export async function countBoard() {
  let response = '';
  let error = '';

  try {
    response = await axios({
      method: 'get',
      url: '/board/count/',
    });
  } catch (e) {
    error = e.message;
  }

  return {
    type: COUNT,
    response,
    error,
  };
}

// 글 디테일
export async function retrieveBoard(id) {
  let response = '';
  let error = '';

  try {
    response = await axios({
      method: 'get',
      url: `/board/view/${id}`,
    });
  } catch (e) {
    error = e.message;
  }

  return {
    type: RETRIEVE,
    response,
    error,
  };
}

// 글 수정
export async function patchBoard(formData, id) {
  let response = '';
  let error = '';

  try {
    response = await axios({
      method: 'patch',
      url: `/board/${id}`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      data: formData,
    });
  } catch (e) {
    error = e.message;
  }

  return {
    type: PATCH,
    response,
    error,
  };
}

// 글 삭제
export async function destroyBoard(id) {
  let response = '';
  let error = '';

  try {
    response = await axios({
      method: 'delete',
      url: `/board/${id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  } catch (e) {
    error = e.message;
  }

  return {
    type: DESTROY,
    response,
    error,
  };
}

// Initial State
const initialState = {
  list: [],
  retrieve: {},
  count: 0,
  error: '',
};

// Reducer Functions
function reducerCreateBoard(action, state) {
  if (action.response) {
    return {
      ...state,
      retrieve: action.response.data,
      error: '',
    };
  }
  return {
    ...state,
    retrieve: {},
    error: action.error,
  };
}

function reducerListBoard(action, state) {
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

function reducerCountBoard(action, state) {
  if (action.response) {
    return {
      ...state,
      count: action.response.data,
      error: '',
    };
  }
  return {
    ...state,
    count: 0,
    error: action.error,
  };
}

function reducerRetrieveBoard(action, state) {
  if (action.response) {
    return {
      ...state,
      retrieve: action.response.data,
      error: '',
    };
  }
  return {
    ...state,
    retrieve: {},
    error: action.error,
  };
}

function reducerPatchBoard(action, state) {
  if (action.response) {
    return {
      ...state,
      retrieve: action.response.data,
      error: '',
    };
  }
  return {
    ...state,
    retrieve: {},
    error: action.error,
  };
}

function reducerDestroyBoard(action, state) {
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
    case CREATE:
      return reducerCreateBoard(action, state);

    case LIST:
      return reducerListBoard(action, state);

    case COUNT:
      return reducerCountBoard(action, state);

    case RETRIEVE:
      return reducerRetrieveBoard(action, state);

    case PATCH:
      return reducerPatchBoard(action, state);

    case DESTROY:
      return reducerDestroyBoard(action, state);

    default:
      return state;
  }
}
