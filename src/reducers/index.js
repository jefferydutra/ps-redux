import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import authorReducer from './authorReducer';

const rootReducer = combineReducers({
  authorReducer,
  routing
});

export default rootReducer;
