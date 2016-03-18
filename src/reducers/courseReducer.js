import * as types from '../constants/ActionTypes';

const initialState = {
    courses: []
};

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function courseReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOADED_COURSES:
      return Object.assign({}, state, {
        courses: action.courses
      });

    case types.CREATED_COURSE:
     return Object.assign({}, state, {
       courses: [...state.courses, action.course]
     });

    case types.UPDATED_COURSE:
      // existingAuthorIndex = state.courses.findIndex(course => course.id == action.course.id);
      // newState = Object.assign({}, state, { loading: false });
      // newState.courses.splice(existingAuthorIndex, 1, action.course);
      return Object.assign({}, state, {
        courses: [
          ...state.courses.filter(course => course.id == action.course.id),
          action.course
        ]
      });

    case types.DELETED_COURSE:
      return Object.assign({}, state, {
        courses: state.courses.filter((course) => course.id !== action.id)
      });

		default:
			return state;
	}
}
