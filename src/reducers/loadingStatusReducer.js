import * as types from '../constants/ActionTypes';

const initialState = {
  ajaxCallsInProgress: 0
};

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function loadingStatusReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOADING:
      return Object.assign({}, state, {
        ajaxCallsInProgress: state.ajaxCallsInProgress + 1
      });

    case types.LOADING_COMPLETE:
      return Object.assign({}, state, {
        ajaxCallsInProgress: state.ajaxCallsInProgress - 1
      });

    default:
      return state;
  }
}
