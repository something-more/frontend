import axios from 'axios';
import { axiosConfig } from '../include/axios';

axiosConfig(axios);

// Actions
const CREATE = 'something-more/story/CREATE';

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
    console.log(e.response.data.message);
  }

  return {
    type: CREATE,
    response: response,
    error: error
  }
}

// State
const initialState = {
  list: [],
  retrieve: {},
  error: ''
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE:
      return reducerCreateStory(state, action);

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
