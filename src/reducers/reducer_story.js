import axios from 'axios';
import { axiosConfig } from '../include/axios';

axiosConfig(axios);

// Actions
const CREATE = 'something-more/story/CREATE';
const LIST = 'something-more/story/LIST';
const COUNT = 'something-more/story/COUNT';
const RETRIEVE = 'something-more/story/RETRIEVE';
const PATCH = 'something-more/story/PATCH';
const DESTROY = 'something-more/story/DESTROY';

// Action Creators
export async function createStory(formData) {

  let response, error = '';

  try {
    response = await axios({
      method: 'post',
      url: '/story/',
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
    type: CREATE,
    response: response,
    error: error
  }
}

export async function listStory(query = '?page=1') {

  let response, error = '';

  try {
    response = await axios({
      method: 'get',
      url: `/story/${query}`,
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
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

export async function countStory() {

  let response, error = '';

  try {
    response = await axios({
      method: 'get',
      url: '/story/count/',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    });
  } catch (e) {
    error = e.message;
  }

  return {
    type: COUNT,
    response: response,
    error: error
  }
}

export async function retrieveStory(id) {

  let response, error = '';

  try {
    response = await axios({
      method: 'get',
      url: `/story/${id}`,
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
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

export async function patchStory(formData, id) {

  let response, error = '';

  try {
    response = await axios({
      method: 'patch',
      url: `/story/${id}`,
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

export async function destroyStory(id) {

  let response, error = '';

  try {
    response = await axios({
      method: 'delete',
      url: `/story/${id}`,
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

// State
const initialState = {
  list: [],
  retrieve: {},
  error: '',
  count: 0
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE:
      return reducerCreateStory(state, action);

    case LIST:
      return reducerListStory(state, action);

    case COUNT:
      return reducerCountStory(state, action);

    case RETRIEVE:
      return reducerRetrieveStory(state, action);

    case PATCH:
      return reducerPatchStory(state, action);

    case DESTROY:
      return reducerDestroyStory(state, action);

    default:
      return state;
  }
}

// Reducer function
function reducerCreateStory(state, action) {
  if (action.response) {
    return {
      ...state,
      retrieve: action.response.data,
      error: ''
    }
  } else {
    return {
      ...state,
      error: action.error
    }
  }
}

function reducerListStory(state, action) {
  if (action.response) {
    return {
      ...state,
      list: action.response.data,
      error: ''
    }
  } else {
    return {
      ...state,
      error: action.error
    }
  }
}

function reducerCountStory(state, action) {
  if (action.response) {
    return {
      ...state,
      count: Number(action.response.data),
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

function reducerRetrieveStory(state, action) {
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

function reducerPatchStory(state, action) {
  if (action.response) {
    return {
      ...state,
      retrieve: action.response.data,
      error: ''
    }
  } else {
    return {
      ...state,
      retrieve: '',
      error: action.error
    }
  }
}

function reducerDestroyStory(state, action) {
  if (action.response) {
    return {
      ...state,
      retrieve: {},
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
