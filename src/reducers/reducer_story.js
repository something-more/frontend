import axios from 'axios';
import axiosConfig from '../include/axios';

axiosConfig(axios);

// Actions
const CREATE = 'something-more/story/CREATE';
const LIST = 'something-more/story/LIST';
const CLIENT = 'something-more/story/CLIENT';
const COUNT = 'something-more/story/COUNT';
const RETRIEVE = 'something-more/story/RETRIEVE';
const PATCH = 'something-more/story/PATCH';
const PUBLISH = 'something-more/story/PUBLISH';
const DESTROY = 'something-more/story/DESTROY';

// Action Creators
export async function createStory(formData) {
  let response = '';
  let error = '';

  try {
    response = await axios({
      method: 'post',
      url: '/story/',
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

export async function listStory(query = 1) {
  let response = '';
  let error = '';

  try {
    response = await axios({
      method: 'get',
      url: `/story/?page=${query}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
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

export async function clientListStory() {
  let response = '';
  let error = '';

  try {
    response = await axios({
      method: 'get',
      url: '/story/client/',
    });
  } catch (e) {
    error = e.message;
  }

  return {
    type: CLIENT,
    response,
    error,
  };
}

export async function countStory() {
  let response = '';
  let error = '';

  try {
    response = await axios({
      method: 'get',
      url: '/story/count/',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
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

export async function retrieveStory(id) {
  let response = '';
  let error = '';

  try {
    response = await axios({
      method: 'get',
      url: `/story/${id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
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

export async function patchStory(formData, id) {
  let response = '';
  let error = '';

  try {
    response = await axios({
      method: 'patch',
      url: `/story/${id}`,
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

export async function changePublishStory(formData, id) {
  let response = '';
  let error = '';

  try {
    response = await axios({
      method: 'patch',
      url: `/story/publish/${id}`,
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
    type: PUBLISH,
    response,
    error,
  };
}

export async function destroyStory(id) {
  let response = '';
  let error = '';

  try {
    response = await axios({
      method: 'delete',
      url: `/story/${id}`,
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

// State
const initialState = {
  list: [],
  retrieve: {},
  error: '',
  count: 0,
};

// Reducer function
function reducerCreateStory(state, action) {
  if (action.response) {
    return {
      ...state,
      retrieve: action.response.data,
      error: '',
    };
  }
  return {
    ...state,
    error: action.error,
  };
}

function reducerListStory(state, action) {
  if (action.response) {
    return {
      ...state,
      list: action.response.data,
      error: '',
    };
  }
  return {
    ...state,
    error: action.error,
  };
}

function reducerClientListStory(state, action) {
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

function reducerCountStory(state, action) {
  if (action.response) {
    return {
      ...state,
      count: Number(action.response.data),
      error: '',
    };
  }
  return {
    ...state,
    count: 0,
    error: action.error,
  };
}

function reducerRetrieveStory(state, action) {
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

function reducerPatchStory(state, action) {
  if (action.response) {
    return {
      ...state,
      retrieve: action.response.data,
      error: '',
    };
  }
  return {
    ...state,
    retrieve: '',
    error: action.error,
  };
}

function reducerChangePublishStory(state, action) {
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

function reducerDestroyStory(state, action) {
  if (action.response) {
    return {
      ...state,
      retrieve: {},
      error: '',
    };
  }
  return {
    ...state,
    retrieve: {},
    error: action.error,
  };
}

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE:
      return reducerCreateStory(state, action);

    case LIST:
      return reducerListStory(state, action);

    case CLIENT:
      return reducerClientListStory(state, action);

    case COUNT:
      return reducerCountStory(state, action);

    case RETRIEVE:
      return reducerRetrieveStory(state, action);

    case PATCH:
      return reducerPatchStory(state, action);

    case PUBLISH:
      return reducerChangePublishStory(state, action);

    case DESTROY:
      return reducerDestroyStory(state, action);

    default:
      return state;
  }
}
