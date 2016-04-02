import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import authors from './authors';
import courses from './courses';
import ajaxCallsInProgress from './ajaxCallsInProgress';

const rootReducer = combineReducers({
  authors,
  courses,
  ajaxCallsInProgress,
  routing
});

export default rootReducer;
