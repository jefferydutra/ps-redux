import * as types from '../constants/ActionTypes';

export function loading() {
  return { type: types.LOADING };
}

export function loadingComplete() {
  return { type: types.LOADING_COMPLETE };
}
