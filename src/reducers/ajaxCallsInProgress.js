import * as types from '../constants/actionTypes';

export default function ajaxCallsInProgress(state = 0, action) {
  switch (action.type) {
    case types.LOADING:
      return state + 1;

    case types.LOADING_COMPLETE:
      return state - 1;

    default:
      return state;
  }
}
