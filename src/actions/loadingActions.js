import * as types from './actionTypes';

export function loading() {
  return { type: types.LOADING };
}

export function loadingComplete() {
  return { type: types.LOADING_COMPLETE };
}
