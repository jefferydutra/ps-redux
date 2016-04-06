import expect from 'expect';
import loadingReducer from './loadingReducer';
import * as actions from '../actions/loadingActions';

describe('Loading Reducer', () => {
  it('should increment the number of calls in progress', () => {
    // arrange
    const initialState = 0;
    const action = actions.loading();

    // act
    const numberOfAjaxCallsInProgress = loadingReducer(initialState, action);

    // assert
    expect(numberOfAjaxCallsInProgress).toEqual(1);
  });

  it('should decrement the number of calls in progress', () => {
    // arrange
    const initialState = 3;
    const action = actions.loadingComplete();

    // act
    const numberOfAjaxCallsInProgress = loadingReducer(initialState, action);

    // assert
    expect(numberOfAjaxCallsInProgress).toEqual(2);
  });
});
