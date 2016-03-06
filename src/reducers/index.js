import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import authorReducer from './authors';

const rootReducer = combineReducers({
  authorReducer,
  routing
});

export default rootReducer;
