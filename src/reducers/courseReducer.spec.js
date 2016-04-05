import expect from 'expect';
import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

describe('Course Reducer', () => {
  it('should add course in alphabetical order', () => {
    // arrange
    const initialState = [
      { title: 'A' },
      { title: 'C' }
    ];

    const newCourse = { title: 'B' };

    const action = actions.createdCourse(newCourse);

    // act
    const newState = courseReducer(initialState, action);

    // assert
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('A');
    expect(newState[1].title).toEqual('B');
    expect(newState[2].title).toEqual('C');
  });

  it('should create a new object when creating a new course', () => {
    // arrange
    const initialState = [
      { title: 'A'}
    ];

    const newCourse = { title: 'B' };
    const action = actions.createdCourse(newCourse);

    // act
    const newState = courseReducer(initialState, action);
    const newCourseInNewState = newState.find(course => course.title == 'B');
    newCourseInNewState.title = 'C';

    // assert that the object reference passed into course reducer wasn't manipulated
    expect(newCourse.title).toEqual('B');
  });

  it('should remove course', () => {
    // arrange
    const initialState = [
        { id: 1 },
        { id: 2 }
      ];

    const deletedcourseId = 2;
    const action = actions.deletedCourse(deletedcourseId);

    // act
    const newState = courseReducer(initialState, action);

    // assert
    expect(newState.length).toEqual(1);
  });

  it('should update course and sort alphabetically', () => {
    // arrange
    const initialState = [
        { id: 'A', title: 'A' },
        { id: 'B', title: 'B' },
        { id: 'C', title: 'C' }
      ];

    //Changing course's name from B to Z to test sorting.
    const course = { id: 'B', title: 'Z' };
    const action = actions.updatedCourse(course);

    // act
    const newState = courseReducer(initialState, action);
    const updatedCourse = newState.find(a => a.id == course.id);
    const untouchedCourse = newState.find(a => a.id == 'A');

    // assert
    expect(updatedCourse.title).toEqual('Z');
    expect(untouchedCourse.title).toEqual('A');
    expect(newState[0].title).toEqual('A');
    expect(newState[1].title).toEqual('C');
    expect(newState[2].title).toEqual('Z');
  });

  it('should load courses in alphabetical order', () => {
    // arrange
    const initialState = [];

    const coursesToLoad = [
      { title: 'B' },
      { title: 'C' },
      { title: 'A' }
    ];

    const action = actions.loadedCourses(coursesToLoad);

    // act
    const newState = courseReducer(initialState, action);
    const numCoursesLoaded = newState.length;

    // assert
    expect(numCoursesLoaded).toEqual(3);
    expect(newState[0].title).toEqual('A');
    expect(newState[1].title).toEqual('B');
    expect(newState[2].title).toEqual('C');
  });
});
