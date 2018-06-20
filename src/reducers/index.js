import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Authors from './reducer_authors';
import ActiveAuthor from './reducer_active_author';
import AuthReducer from './reducer_auth';

const rootReducer = combineReducers({
  authors: Authors,
  activeAuthor: ActiveAuthor,
  auth: AuthReducer,
  form: formReducer
});

export default rootReducer;
