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
      const author = authors()[id -1];
      const newState = { ...state };
      newState[author.id] = author;
      return newState;

    default:
      return state
  }
}
