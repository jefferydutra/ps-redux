import * as types from '../constants/actionTypes';

export function sortByTitle(courses) {
  return courses.sort((a, b) => a.title > b.title);
}

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function courses(state = [], action) {
  switch (action.type) {
    case types.LOADED_COURSES:
      return sortByTitle(action.courses);

    case types.CREATED_COURSE:
      return sortByTitle([
        ...state,
        Object.assign({}, action.course)
      ]);

    case types.UPDATED_COURSE:
      // Alternative approach.
      // existingAuthorIndex = state.courses.findIndex(course => course.id == action.course.id);
      // newState = Object.assign({}, state, { loading: false });
      // newState.courses.splice(existingAuthorIndex, 1, action.course);
      return sortByTitle([
        ...state.filter(course => course.id !== action.course.id),
        Object.assign({}, action.course)
      ]);

    case types.DELETED_COURSE:
      return state.filter(course => course.id !== action.id);

		default:
			return state;
	}
}
