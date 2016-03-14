import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import authorReducer from './authorReducer';
import courseReducer from './courseReducer';

const rootReducer = combineReducers({
  authorReducer,
  courseReducer,
  routing
});

export default rootReducer;
