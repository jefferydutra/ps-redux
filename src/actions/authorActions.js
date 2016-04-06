import AuthorApi from '../api/mockAuthorApi';
import * as types from './actionTypes';
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

// Functions below are called thunks. They handle asynchronous calls.
// Each returns a function that accepts dispatch.
// These are used by redux-thunk to support asynchronous interactions.
export function loadAuthors() {
  return dispatch => {
    dispatch(loading());
    return AuthorApi.getAllAuthors().then( authors => {
      dispatch(loadedAuthors(authors));
      dispatch(loadingComplete());
    }).catch( error => {
      dispatch(loadingComplete());
      throw(error);
    });
  };
}

export function saveAuthor(author) {
  return dispatch => {
    dispatch(loading());
    return AuthorApi.saveAuthor(author).then( author => {
      author.id ? dispatch(updatedAuthor(author)) : dispatch(createdAuthor(author));
      dispatch(loadingComplete());
    }).catch( error => {
      dispatch(loadingComplete());
      throw(error);
    });
  };
}

// Optimistically deleting for perceived performance
// Note that there's no loading action dispatched
// Since the UI will be immediately updated
// The user will only be notified if there's an error.
export function deleteAuthor(authorId) {
  return dispatch => {
    dispatch(deletedAuthor(authorId));
    return AuthorApi.deleteAuthor(authorId);
  };
}
