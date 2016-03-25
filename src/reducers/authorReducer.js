import * as types from '../constants/ActionTypes';

const initialState = {
    authors: []
};

export function sortByName(authors) {
  return authors.sort((a, b) => a.firstName > b.firstName);
}

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// return an updated copy of the state.
// I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function authorReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOADED_AUTHORS:
      return Object.assign({}, state, {
        authors: sortByName(action.authors)
      });

    case types.CREATED_AUTHOR:
      //newState = Object.assign({}, state, { loading: false });
      //newState.authors.push(action.author);
      //return newState;
     return Object.assign({}, state, {
       authors: sortByName([
         ...state.authors,
         action.author
       ])
     });

    case types.UPDATED_AUTHOR:
      return Object.assign({}, state, {
        authors: sortByName([
          ...state.authors.filter((author) => author.id !== action.author.id),
          action.author
        ])
      });

    case types.DELETED_AUTHOR:
      return Object.assign({}, state, {
        authors: state.authors.filter((author) => author.id !== action.id)
      });

		default:
			return state;
	}
}
