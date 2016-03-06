import AuthorApi from '../api/authorApi';

//Define constants for reuse in reducer
export const LOADING = 'LOADING';
export const LOADED_AUTHORS = 'LOADED_AUTHORS';
export const CREATED_AUTHOR = 'CREATED_AUTHOR';
export const UPDATED_AUTHOR = 'UPDATED_AUTHOR';
export const DELETED_AUTHOR = 'DELETED_AUTHOR';

export function loading() {
	return { type: LOADING };
}

export function loadedAuthors(authors) {
	return { type: LOADED_AUTHORS, authors: authors };
}

export function createdAuthor(author) {
	return { type: CREATED_AUTHOR, author: author };
}

export function updatedAuthor(author) {
	return { type: UPDATED_AUTHOR, author: author };
}

export function deletedAuthor(authorId) {
	return { type: DELETED_AUTHOR, authorId: authorId };
}

function handleError() {
	//Error handling code here.
}

// Functions below handle asynchronous calls.
// Each returns a function that accepts a dispatch.
// These are used by redux-thunk to support asynchronous interactions.
export function loadAuthors() {
    return function(dispatch) {
        dispatch(loading());
        return AuthorApi.getAllAuthors().then(function(authors) {
            dispatch(loadedAuthors(authors));
        }).catch(handleError);
    };
}

export function createAuthor(author) {
    return function(dispatch) {
        dispatch(loading());
        return AuthorApi.saveAuthor(author).then(function(author) {
            dispatch(createdAuthor(author));
        }).catch(handleError);
    };
}

export function updateAuthor(author) {
    return function(dispatch) {
        dispatch(loading());
        return AuthorApi.updateAuthor(author).then(function(author) {
            dispatch(updatedAuthor(author));
        }).catch(handleError);
    };
}

export function deleteAuthor(authorId) {
    return function(dispatch) {
        dispatch(loading());
        return AuthorApi.deleteAuthor(authorId).then(function(authorId) {
            dispatch(deletedAuthor(authorId));
        }).catch(handleError);
    };
}
