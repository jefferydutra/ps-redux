import expect from 'expect';
import * as actions from './authorActions';
import * as types from '../constants/ActionTypes';
// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import nock from 'nock';

// const middlewares = [ thunk ]

// Test a sync action
describe('Author actions', () => {
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

//
// const mockStore = configureMockStore(middlewares)
//
// describe('async actions', () => {
//   afterEach(() => {
//     nock.cleanAll();
//   })
//
//   it('creates CREATED_AUTHOR when author has created', (done) => {
//     nock('http://example.com/')
//       .get('/todos')
//       .reply(200, { body: { todos: ['do something'] }})
//
//     const expectedActions = [
//       { type: types.FETCH_TODOS_REQUEST },
//       { type: types.FETCH_TODOS_SUCCESS, body: { todos: ['do something']  } }
//     ]
//     const store = mockStore({ todos: [] }, expectedActions, done)
//     store.dispatch(actions.fetchTodos())
//   })
// })
