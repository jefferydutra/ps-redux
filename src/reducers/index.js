import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import authors from './authors';
import courses from './courses';
import loadingStatus from './loadingStatus';

const rootReducer = combineReducers({
  authors,
  courses,
  loadingStatus,
  routing
});

export default rootReducer;
