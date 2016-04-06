import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

// Note that since I'm exporting default from my reducers, I can
// import them here with whatever name I like. I prefer to remove
// the reducer suffix here so that I can reference my state
// in mapStateToProps as state.courses instead of state.coursesReducer.
import authors from './authorReducer';
import courses from './courseReducer';
import ajaxCallsInProgress from './loadingReducer';

const rootReducer = combineReducers({
  authors,
  courses,
  ajaxCallsInProgress,
  routing
});

export default rootReducer;
