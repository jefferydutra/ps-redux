import * as types from '../constants/ActionTypes';

const initialState = {
    authors: []
};

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function authorState(state = initialState, action) {
  switch (action.type) {
    case types.LOADING:
      return Object.assign({}, state, {
        loading: true
      });

    case types.LOADED_AUTHORS:
      return Object.assign({}, state, {
        authors: action.authors,
        loading: false
      });

    case types.CREATED_AUTHOR:
      //newState = Object.assign({}, state, { loading: false });
      //newState.authors.push(action.author);
      //return newState;
     return Object.assign({}, state, {
       loading: false,
       authors: [
         ...state.authors,
         action.author
       ]
     });

    case types.UPDATED_AUTHOR:
      return Object.assign({}, state, {
        loading: false,
        authors: [
          ...state.authors.filter((author) => author.id !== action.author.id),
          action.author
        ]
      });

    case types.DELETED_AUTHOR:
      return Object.assign({}, state, {
        loading: false,
        authors: state.authors.filter((author) => author.id !== action.id)
      });

		default:
			return state;
	}
}
