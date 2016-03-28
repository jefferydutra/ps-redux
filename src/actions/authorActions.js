import AuthorApi from '../api/mockAuthorApi';
import * as types from '../constants/actionTypes';
import {loading, loadingComplete} from './loadingActions';

// Functions below are action creators. These handle synchronous actions.
// Async actions are handled via Thunks or Sagas.
export function loadedAuthors(authors) {
	return { type: types.LOADED_AUTHORS, authors };
}

export function createdAuthor(author) {
	return { type: types.CREATED_AUTHOR, author };
}

export function updatedAuthor(author) {
	return { type: types.UPDATED_AUTHOR, author };
}

export function deletedAuthor(id) {
	return { type: types.DELETED_AUTHOR, id };
}

export function handleError(error) {
  console.error(error); //eslint-disable-line no-console
}

// Functions below are called thunks. They handle asynchronous calls.
// Each returns a function that accepts dispatch.
// These are used by redux-thunk to support asynchronous interactions.
export function loadAuthors() {
  return dispatch => {
    dispatch(loading());
    return AuthorApi.getAllAuthors().then(function(authors) {
      dispatch(loadedAuthors(authors));
      dispatch(loadingComplete());
    }).catch(handleError);
  };
}

export function createAuthor(author) {
  return dispatch => {
    dispatch(loading());
    return AuthorApi.saveAuthor(author).then(function(author) {
      dispatch(createdAuthor(author));
      dispatch(loadingComplete());
    }).catch(handleError);
  };
}

// Optimistically updating authors for perceived performance.
export function updateAuthor(author) {
  return dispatch => {
    dispatch(updatedAuthor(author));
    return AuthorApi.saveAuthor(author).catch(handleError);
  };
}

// Optimistically deleting for perceived performance
export function deleteAuthor(authorId) {
  return dispatch => {
    dispatch(deletedAuthor(authorId));
    return AuthorApi.deleteAuthor(authorId).catch(handleError);
  };
}
