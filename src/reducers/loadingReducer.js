import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loadingReducer(state = initialState.ajaxCallsInProgress, action) {
  switch (action.type) {
    case types.LOADING:
      return state + 1;

    case types.LOADING_COMPLETE:
      return state - 1;

    default:
      return state;
  }
}
