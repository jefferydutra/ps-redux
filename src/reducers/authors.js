import * as types from '../constants/actionTypes';

function sortByName(authors) {
  return authors.sort((a, b) => a.firstName > b.firstName);
}

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// return an updated copy of the state.
// I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function authors(state = [], action) {
  switch (action.type) {
    case types.LOADED_AUTHORS:
      return sortByName(action.authors);

    case types.CREATED_AUTHOR:
      //newState = Object.assign({}, state, { loading: false });
      //newState.authors.push(action.author);
      //return newState;
     return sortByName([
         ...state,
         action.author
       ]);

    case types.UPDATED_AUTHOR:
      return sortByName([
        ...state.filter((author) => author.id !== action.author.id),
        action.author
      ]);

    case types.DELETED_AUTHOR:
      return state.filter((author) => author.id !== action.id);

		default:
			return state;
	}
}
