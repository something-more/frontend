import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthorReducer from './reducer_author';
import AuthReducer from './reducer_auth';

const rootReducer = combineReducers({
  author: AuthorReducer,
  auth: AuthReducer,
  form: formReducer
});

export default rootReducer;
