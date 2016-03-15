import React, {PropTypes} from 'react';
import * as courseActions from '../../actions/courseActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import CourseList from './CourseList';

//Note that this is a controller view, which is why it gets data
//and passes it down to child components via props.
class CoursePage extends React.Component {
  componentWillMount() {
    //load author data if it hasn't already been loaded.
    if (this.props.appState.courses.length == 0) {
      this.props.actions.loadCourses();
    }
  }

  deleteCourse(event, courseId) {
    event.preventDefault();
    this.props.actions.deleteCourse(courseId);
    alert('Course deleted.');
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        {/* Note that I have to create an anonymous function
          or the click handler will immediately fire!
          Also, note the structure of this comment, have to
          create an empty JS expression to comment since this is
          all parsed as JS */}
          <input type="submit" value="Add Course" className="btn btn-default" onClick={() => {browserHistory.push('/course');}} />
          <CourseList
            deleteCourse={this.deleteCourse.bind(this)}
            courses={this.props.appState.courses}/>
      </div>
    );
  }
}

CoursePage.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    appState: state.courseReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

const connectedCoursePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursePage);

export default connectedCoursePage;
