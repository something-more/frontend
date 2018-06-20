import authors from './reducer_authors';

// Actions
const LOAD = 'something-more/authors/LOAD';

// Action Creators
export function selectAuthor(id) {

  return {
    type: LOAD,
    payload: id
  };
}

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case LOAD:
      const id = action.payload;
      return authors()[id -1];

    default:
      return state
  }
}
