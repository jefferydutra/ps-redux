import expect from 'expect';
import * as actions from './authorActions';
import * as types from './actionTypes';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

const middlewares = [ thunk ];

// Test a sync action
describe('Author Actions', () => {
  it('should create a CREATED_AUTHOR action', () => {
    //arrange
    const author = { id: 1, firstName: 'Cory'};
    const expectedAction = {
      type: types.CREATED_AUTHOR,
      author
    };

    //act
    const action = actions.createdAuthor(author);

    //assert
    expect(action).toEqual(expectedAction);
  });
});

// Test an async action
const mockStore = configureMockStore(middlewares)

describe('Async Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create LOADING_AUTHOR when authors have been loaded', (done) => {
    // nock('http://example.com/')
    //   .get('/authors')
    //   .reply(200, { body: { authors: [{ id: 1, firstName: 'Cory', lastName: 'House'}] }});

    const expectedActions = [
      { type: types.LOADING },
      { type: types.LOADING_COMPLETE },
      { type: types.LOADED_AUTHORS, body: { authors: [{ id: 1, firstName: 'Cory', lastName: 'House'}]  } }
    ];
    const store = mockStore({ authors: [] }, expectedActions, done);
    store.dispatch(actions.loadAuthors())
      .then(() => {
        const actions = store.getActions();

        expect(actions[0].type).toEqual(types.LOADING);

        done();
      })
  });
});
