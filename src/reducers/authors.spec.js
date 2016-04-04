import expect from 'expect';
import authors from './authors';
import * as actions from '../actions/authorActions';

describe('Author Reducer', () => {
  it('should add author in alphabetical order', () => {
    // arrange
    const initialState = [
      { firstName: 'A' },
      { firstName: 'C' }
    ];
    const newAuthor = { firstName: 'B' };

    const action = actions.createdAuthor(newAuthor);

    // act
    const newState = authors(initialState, action);

    // assert
    expect(newState.length).toEqual(3);
    expect(newState[0].firstName).toEqual('A');
    expect(newState[1].firstName).toEqual('B');
    expect(newState[2].firstName).toEqual('C');
  });

  it('should create a new object when creating a new author', () => {
    // arrange
    const initialState = [
      { firstName: 'A'}
    ];

    const newAuthor = { firstName: 'B' };
    const action = actions.createdAuthor(newAuthor);

    // act
    const newState = authors(initialState, action);
    const newAuthorInNewState = newState.find(author => author.firstName == 'B');
    newAuthorInNewState.firstName = 'C';

    // assert that the object passed into authors reducer wasn't manipulated
    expect(newAuthor.firstName).toEqual('B');
    expect(newAuthorInNewState.firstName).toEqual('C');
  });

  it('should remove author', () => {
    //arrange
    const initialState = [
        { id: 1 },
        { id: 2 }
      ];

    const deletedAuthorId = 2;
    const action = actions.deletedAuthor(deletedAuthorId);

    //act
    const newState = authors(initialState, action);

    //assert
    expect(newState.length).toEqual(1);
  });

  it('should update author and sort alphabetically', () => {
    // arrange
    const initialState = [
        { id: 'A', firstName: 'A' },
        { id: 'B', firstName: 'B' },
        { id: 'C', firstName: 'C' }
      ];

    //Changing author's name from B to Z to test sorting.
    const author = { id: 'B', firstName: 'Z' };
    const action = actions.updatedAuthor(author);

    // act
    const newState = authors(initialState, action);
    const updatedAuthor = newState.find(a => a.id == author.id);
    const untouchedAuthor = newState.find(a => a.id == 'A');

    // assert
    expect(updatedAuthor.firstName).toEqual('Z');
    expect(untouchedAuthor.firstName).toEqual('A');
    expect(newState[0].firstName).toEqual('A');
    expect(newState[1].firstName).toEqual('C');
    expect(newState[2].firstName).toEqual('Z');
  });

  it('should load authors in alphabetical order', () => {
    // arrange
    const initialState = [];

    const authorsToLoad = [
      { firstName: 'B' },
      { firstName: 'C' },
      { firstName: 'A' }
    ];

    const action = actions.loadedAuthors(authorsToLoad);

    // act
    const newState = authors(initialState, action);
    const numAuthorsLoaded = newState.length;

    // assert
    expect(numAuthorsLoaded).toEqual(3);
    expect(newState[0].firstName).toEqual('A');
    expect(newState[1].firstName).toEqual('B');
    expect(newState[2].firstName).toEqual('C');
  });
});
