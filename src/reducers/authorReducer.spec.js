import expect from 'expect';
import authorReducer from './authorReducer';
import * as actions from '../actions/authorActions';

describe('Author Reducer', () => {
  it('should add author', () => {
    //arrange
    const newAuthor = {}; //empty since merely testing that it's added.
    const initialState = { authors: [] };
    const action = actions.createdAuthor(newAuthor);

    //act
    const newState = authorReducer(initialState, action);

    //assert
    expect(newState.authors.length).toEqual(1);
  });

  it('should remove author', () => {
    //arrange
    const initialState = {
      authors: [
        { id: 1 },
        { id: 2 }
      ]
    };
    const deletedAuthorId = 2;
    const action = actions.deletedAuthor(deletedAuthorId);

    //act
    const newState = authorReducer(initialState, action);

    //assert
    expect(newState.authors.length).toEqual(1);
  });

  it('should update author', () => {
    //arrange
    const initialState = {
      authors: [
        { id: 1, firstName: 'Cory' },
        { id: 2, firstName: 'Bob' }
      ]
    };

    const author = { id: 1, firstName: 'newname' };
    const action = actions.updatedAuthor(author);

    //act
    const newState = authorReducer(initialState, action);
    const updatedAuthor = newState.authors.find(a => a.id == author.id);
    const untouchedAuthor = newState.authors.find(a => a.id == 2);

    //assert
    expect(updatedAuthor.firstName).toEqual('newname');
    expect(untouchedAuthor.firstName).toEqual('Bob');
  });

  it('should load authors', () => {
    //arrange
    const initialState = { authors: [] };

    const authorsToLoad = [
      { id: 1 },
      { id: 2 }
    ];

    const action = actions.loadedAuthors(authorsToLoad);

    //act
    const newState = authorReducer(initialState, action);
    const numAuthorsLoaded = newState.authors.length;

    //assert
    expect(numAuthorsLoaded).toEqual(2);
  });
});
