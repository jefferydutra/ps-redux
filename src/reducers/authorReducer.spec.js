import chai from 'chai';
import authorReducer from './authorReducer';
import * as actions from '../actions/authorActions';

chai.should();

describe('Author Reducer', () => {
  it('should add author', () => {
    //arrange
    const newAuthor = {}; //empty since merely testing that it's added.
    const initialState = { authors: [] };
    const action = actions.createdAuthor(newAuthor);

    //act
    const newState = authorReducer(initialState, action);

    //assert
    newState.authors.length.should.equal(1);
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
    newState.authors.length.should.equal(1);
  });

  it('should update author', () => {
    //arrange
    const initialState = {
      authors: [
        { id: 1, firstName: 'Cory' },
        { id: 2, firstName: 'Bob' }
      ]
    };

    const updatedAuthor = { id: 1, firstName: 'newname' };
    const action = actions.updatedAuthor(updatedAuthor);

    //act
    const newState = authorReducer(initialState, action);

    //assert
    newState.authors.find(a => a.id == updatedAuthor.id).firstName.should.equal('newname');
  });

  it('should load author', () => {
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
    numAuthorsLoaded.should.equal(2);
  });
});
