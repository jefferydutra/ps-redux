import * as types from '../constants/actionTypes';
import { take, put, call, fork, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import AuthorApi from '../api/mockAuthorApi';
import { createdAuthor, updatedAuthor, deletedAuthor, handleError } from '../actions/authorActions';
import {loading, loadingComplete} from '../actions/loadingActions';

/* eslint-disable no-constant-condition */
export function* createAuthor(action) {
    yield put(loading);

    try {
      // The call function is part of Redux-saga, so the Saga middleware
      // will call the API for us. Again, when this is done, the Saga
      // will resume. NOTE: The function you pass to call needs to return
      // a promise. Good thing our API does. :) That's how Redux saga knows
      // it's an async call that it needs to wait for. :)
      const author = yield call(AuthorApi.saveAuthor, action.author);
      yield put(createdAuthor(author));
    } catch(err) {
      yield put(handleError(err));
    }
}

export function* updateAuthor(action) {
  yield put(loading);

  try {
    const author = yield call(AuthorApi.updateAuthor, action.author);
    yield put(updatedAuthor(author));
  } catch(err) {
    yield put(handleError(err));
  }
}

export function* deleteAuthor(action) {
  yield put(loading);

  try {
    const id = yield call(AuthorApi.deleteAuthor, action.author);
    yield put(deletedAuthor(id));
  } catch(err) {
    yield put(handleError(err));
  }
}

// Watchers - These generators watch for all actions
// and fire the generators above when they see specific actions.

// Here, we're watching for createAuthor actions using takeEvery.
// Each time one occurs, we're going to fire off a createAuthor action.
function* watchCreateAuthor() {
  // Yep, infinite loop. Don't worry, this just assures our watcher
  // is always watching. It's not continually running.
  while (true) {
    yield* takeEvery(types.CREATE_AUTHOR, createAuthor);
  }
}

function* watchUpdateAuthor() {
  while (true) {
    yield* takeEvery(types.UPDATE_AUTHOR, updateAuthor);
  }
}

function* watchDeleteAuthor() {
  while (true) {
    yield* takeEvery(types.DELETE_AUTHOR, deleteAuthor);
  }
}

// This root function referenced by the store.
// Add other watch generators to this array as needed.
export default function* root() {
  yield [
    fork(watchCreateAuthor),
    fork(watchUpdateAuthor)
  ];
}
