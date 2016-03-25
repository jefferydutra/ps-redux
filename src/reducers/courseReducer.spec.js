import expect from 'expect';
import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

describe('Course Reducer', () => {
  it('should add course in alphabetical order', () => {
    //arrange
    const initialState = { courses: [
      { title: 'A' },
      { title: 'C' }
    ] };
    const newcourse = { title: 'B' };

    const action = actions.createdCourse(newcourse);

    //act
    const newState = courseReducer(initialState, action);

    //assert
    expect(newState.courses.length).toEqual(3);
    expect(newState.courses[0].title).toEqual('A');
    expect(newState.courses[1].title).toEqual('B');
    expect(newState.courses[2].title).toEqual('C');
  });

  it('should remove course', () => {
    //arrange
    const initialState = {
      courses: [
        { id: 1 },
        { id: 2 }
      ]
    };
    const deletedcourseId = 2;
    const action = actions.deletedCourse(deletedcourseId);

    //act
    const newState = courseReducer(initialState, action);

    //assert
    expect(newState.courses.length).toEqual(1);
  });

  it('should update course and sort alphabetically', () => {
    //arrange
    const initialState = {
      courses: [
        { id: 'A', title: 'A' },
        { id: 'B', title: 'B' },
        { id: 'C', title: 'C' }
      ]
    };

    //Changing course's name from B to Z to test sorting.
    const course = { id: 'B', title: 'Z' };
    const action = actions.updatedCourse(course);

    //act
    const newState = courseReducer(initialState, action);
    const updatedcourse = newState.courses.find(a => a.id == course.id);
    const untouchedcourse = newState.courses.find(a => a.id == 'A');

    //assert
    expect(updatedcourse.title).toEqual('Z');
    expect(untouchedcourse.title).toEqual('A');
    expect(newState.courses[0].title).toEqual('A');
    expect(newState.courses[1].title).toEqual('C');
    expect(newState.courses[2].title).toEqual('Z');
  });

  it('should load courses in alphabetical order', () => {
    //arrange
    const initialState = { courses: [] };

    const coursesToLoad = [
      { title: 'B' },
      { title: 'C' },
      { title: 'A' }
    ];

    const action = actions.loadedCourses(coursesToLoad);

    //act
    const newState = courseReducer(initialState, action);
    const numcoursesLoaded = newState.courses.length;

    //assert
    expect(numcoursesLoaded).toEqual(3);
    expect(newState.courses[0].title).toEqual('A');
    expect(newState.courses[1].title).toEqual('B');
    expect(newState.courses[2].title).toEqual('C');
  });
});
