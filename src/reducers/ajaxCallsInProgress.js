import * as types from '../constants/actionTypes';
import initialState from '../constants/initialState';

export default function ajaxCallsInProgress(state = initialState.ajaxCallsInProgress, action) {
  switch (action.type) {
    case types.LOADING:
      return state + 1;

    case types.LOADING_COMPLETE:
      return state - 1;

    default:
      return state;
  }
}
