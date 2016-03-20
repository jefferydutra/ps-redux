import AuthorApi from '../api/authorApi';
import * as types from '../constants/ActionTypes';
import {loading, loadingComplete} from './loadingActions';

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

function handleError(error) {
  console.error(error); //eslint-disable-line no-console
}

// Functions below handle asynchronous calls.
// Each returns a function that accepts a dispatch.
// These are used by redux-thunk to support asynchronous interactions.
export function loadAuthors() {
	return function(dispatch) {
		dispatch(loading());
		return AuthorApi.getAllAuthors().then(function(authors) {
			dispatch(loadedAuthors(authors));
      dispatch(loadingComplete());
		}).catch(handleError);
	};
}

export function createAuthor(author) {
	return function(dispatch) {
    dispatch(loading());
		return AuthorApi.saveAuthor(author).then(function(author) {
			dispatch(createdAuthor(author));
      dispatch(loadingComplete());
		}).catch(handleError);
	};
}

export function updateAuthor(author) {
	return function(dispatch) {
    dispatch(loading());
		return AuthorApi.saveAuthor(author).then(function(author) {
			dispatch(updatedAuthor(author));
      dispatch(loadingComplete());
		}).catch(handleError);
	};
}

export function deleteAuthor(authorId) {
	return function(dispatch) {
    dispatch(loading());
		return AuthorApi.deleteAuthor(authorId).then(function() {
			dispatch(deletedAuthor(authorId));
      dispatch(loadingComplete());
		}).catch(handleError);
	};
}
