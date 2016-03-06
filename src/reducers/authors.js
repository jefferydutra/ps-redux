import * as Actions from '../actions/authorActions';
import objectAssign from 'object-assign';

const initialState = {
    authors: []
};

//IMPORTANT: Note that with Redux, state should NEVER be changed.
//State is considered immutable. Instead,
//create a copy of the state passed and set new values on the copy.
//Note that I'm using Object.assign to create a copy of current state
//and update values on the copy.
export default function authorAppState(state = initialState, action) {
  let newState;

  switch (action.type) {
    case Actions.LOADING:
      return Object.assign({}, state, { loading: true });

    case Actions.LOADED_AUTHORS:
      return Object.assign({}, state, { authors: action.authors, loading: false });

    case Actions.CREATED_AUTHOR:
      newState = Object.assign({}, state, { loading: false });
      newState.authors.push(action.author);
      return newState;

    case Actions.UPDATED_AUTHOR:
      newState = Object.assign({}, state, { loading: false });
      newState.authors.splice(action.author, 1);
      return newState;

		default:
			return state;
	}
}

export default authorAppState;
