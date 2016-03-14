import CourseApi from '../api/courseApi';
import * as types from '../constants/ActionTypes';

function loading() {
	return { type: types.LOADING };
}

function loadedCourses(courses) {
	return { type: types.LOADED_COURSES, courses };
}

function createdCourse(course) {
	return { type: types.CREATED_COURSE, course };
}

function updatedCourse(course) {
	return { type: types.UPDATED_COURSE, course };
}

function deletedCourse(id) {
	return { type: types.DELETED_COURSE, id };
}

function handleError(error) {
	alert('Sorry, an error occurred: ' + error);
}

// Functions below handle asynchronous calls.
// Each returns a function that accepts a dispatch.
// These are used by redux-thunk to support asynchronous interactions.
export function loadCourses() {
	return function(dispatch) {
		dispatch(loading());
		return CourseApi.getAllCourses().then(function(courses) {
			dispatch(loadedCourses(courses));
		}).catch(handleError);
	};
}

export function createCourse(course) {
	return function(dispatch) {
		dispatch(loading());
		return CourseApi.saveCourse(course).then(function(course) {
			dispatch(createdCourse(course));
		}).catch(handleError);
	};
}

export function updateCourse(course) {
	return function(dispatch) {
		dispatch(loading());
		return CourseApi.saveCourse(course).then(function(course) {
			dispatch(updatedCourse(course));
		}).catch(handleError);
	};
}

export function deleteCourse(courseId) {
	return function(dispatch) {
		dispatch(loading());
		return CourseApi.deleteCourse(courseId).then(function() {
			dispatch(deletedCourse(courseId));
		}).catch(handleError);
	};
}
