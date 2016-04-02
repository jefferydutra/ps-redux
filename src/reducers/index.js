import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import {authors, authorsLoaded} from './authors';
import {courses, coursesLoaded} from './courses';
import ajaxCallsInProgress from './ajaxCallsInProgress';

const rootReducer = combineReducers({
  authors,
  authorsLoaded,
  courses,
  coursesLoaded,
  ajaxCallsInProgress,
  routing
});

export default rootReducer;
