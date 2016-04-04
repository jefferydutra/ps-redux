import CourseApi from '../api/mockCourseApi';
import * as types from '../constants/actionTypes';
import {loading, loadingComplete} from './loadingActions';

export function loadedCourses(courses) {
  return {type: types.LOADED_COURSES, courses};
}

export function createdCourse(course) {
  return {type: types.CREATED_COURSE, course};
}

export function updatedCourse(course) {
  return {type: types.UPDATED_COURSE, course};
}

export function deletedCourse(id) {
  return {type: types.DELETED_COURSE, id};
}

// Functions below handle asynchronous calls.
// Each returns a function that accepts a dispatch.
// These are used by redux-thunk to support asynchronous interactions.
export function loadCourses() {
  return function (dispatch) {
    dispatch(loading());
    return CourseApi.getAllCourses().then(courses => {
      dispatch(loadedCourses(courses));
      dispatch(loadingComplete());
    }).catch(error => {
      dispatch(loadingComplete());
      throw(error);
    });
  };
}

export function saveCourse(course) {
  // Note that I you can get a handle on store state using the 2nd param.
  // This may mean you don't have to pass data into the thunk
  return function (dispatch, getState) {
    // const state = getState(); //example of getting state from store
    dispatch(loading());
    return CourseApi.saveCourse(course).then(course => {
      course.id ? dispatch(updatedCourse(course)) : dispatch(createdCourse(course));
      dispatch(loadingComplete());
    }).catch(error => {
      dispatch(loadingComplete());
      throw(error);
    });
  };
}

// Optimistically deleting for perceived performance
// Note that there's no loading action dispatched
// Since the UI will be immediately updated
// The user will only be notified if there's an error.
export function deleteCourse(courseId) {
  return function (dispatch) {
    dispatch(loading());
    return CourseApi.deleteCourse(courseId).then(() => {
      dispatch(deletedCourse(courseId));
      dispatch(loadingComplete());
    });
  };
}
