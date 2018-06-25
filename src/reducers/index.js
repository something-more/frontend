import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthorReducer from './reducer_author';
import AuthReducer from './reducer_auth';
import StoryReducer from './reducer_story';

const rootReducer = combineReducers({
  author: AuthorReducer,
  auth: AuthReducer,
  story: StoryReducer,
  form: formReducer
});

export default rootReducer;
