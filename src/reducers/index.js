import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AdminReducer from './reducer_admin';
import AuthorReducer from './reducer_author';
import AuthReducer from './reducer_auth';
import StoryReducer from './reducer_story';

const rootReducer = combineReducers({
  admin: AdminReducer,
  author: AuthorReducer,
  auth: AuthReducer,
  story: StoryReducer,
  form: formReducer
});

export default rootReducer;
