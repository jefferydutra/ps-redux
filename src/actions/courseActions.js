import CourseApi from '../api/courseApi';
import * as types from '../constants/actionTypes';
import {loading, loadingComplete} from './loadingActions';

export function loadedCourses(courses) {
	return { type: types.LOADED_COURSES, courses };
}

export function createdCourse(course) {
	return { type: types.CREATED_COURSE, course };
}

export function updatedCourse(course) {
	return { type: types.UPDATED_COURSE, course };
}

export function deletedCourse(id) {
	return { type: types.DELETED_COURSE, id };
}

function handleError(error) {
  console.error(error); //eslint-disable-line no-console
}

// Functions below handle asynchronous calls.
// Each returns a function that accepts a dispatch.
// These are used by redux-thunk to support asynchronous interactions.
export function loadCourses() {
	return function(dispatch) {
		dispatch(loading());
		return CourseApi.getAllCourses().then(function(courses) {
			dispatch(loadedCourses(courses));
      dispatch(loadingComplete());
    }).catch(handleError);
	};
}

export function createCourse(course) {
	return function(dispatch) {
		dispatch(loading());
		return CourseApi.saveCourse(course).then(function(course) {
			dispatch(createdCourse(course));
      dispatch(loadingComplete());
    }).catch(handleError);
	};
}

//Can show how I can do it optimistically. Currently the slow way.
export function updateCourse(course) {
	return function(dispatch) {
		dispatch(loading());
		return CourseApi.saveCourse(course).then(function(course) {
          dispatch(updatedCourse(course));
          dispatch(loadingComplete());
        }).catch(handleError);
	};
}

//Note that deletion is optimistic.
//All actions above could (and arguably should) do the same
//It's a design decision.
export function deleteCourse(courseId) {
	return function(dispatch) {
    dispatch(deletedCourse(courseId));
		return CourseApi.deleteCourse(courseId).catch(handleError);
	};
}
