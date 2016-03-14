import * as types from '../constants/ActionTypes';

const initialState = {
    courses: []
};

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function courseState(state = initialState, action) {
  let newState;
  let courses;
  let existingAuthorIndex;

  switch (action.type) {
    case types.LOADING:
      return Object.assign({}, state, { loading: true });

    case types.LOADED_COURSES:
      return Object.assign({}, state, { courses: action.courses, loading: false });

    case types.CREATED_COURSE:
     newState = Object.assign({}, state, { loading: false });
     newState.courses.push(action.course);
     return newState;

    case types.UPDATED_COURSE:
      existingAuthorIndex = state.courses.findIndex(course => course.id == action.course.id);
      newState = Object.assign({}, state, { loading: false });
      newState.courses.splice(existingAuthorIndex, 1, action.course);
      return newState;

    case types.DELETED_COURSE:
      courses = state.courses.filter((course) => course.id !== action.id);
      return Object.assign({}, state, { courses: courses });

		default:
			return state;
	}
}
