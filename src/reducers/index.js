import { combineReducers } from 'redux';
import Authors from './reducer_authors';
import ActiveAuthor from './reducer_active_author';

const rootReducer = combineReducers({
  authors: Authors,
  activeAuthor: ActiveAuthor
});

export default rootReducer;
