import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import authorReducer from './authorReducer';
import courseReducer from './courseReducer';
import loadingStatusReducer from './loadingStatusReducer';

const rootReducer = combineReducers({
  authorReducer,
  courseReducer,
  loadingStatusReducer,
  routing
});

export default rootReducer;
