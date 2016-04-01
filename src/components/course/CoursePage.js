import React, {PropTypes} from 'react';
import * as courseActions from '../../actions/courseActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import CourseList from './CourseList';
import toastr from 'toastr';

//Note that this is a controller view, which is why it gets data
//and passes it down to child components via props.
class CoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.deleteCourse = this.deleteCourse.bind(this);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  componentWillMount() {
    if (!this.props.coursesLoaded) {
      this.props.actions.loadCourses();
    }
  }

  deleteCourse(event, courseId) {
    event.preventDefault();
    this.props.actions.deleteCourse(courseId);
    toastr.success('Course deleted.');
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  render() {
    const {courses} = this.props;
    return (
      <div>
        <h1>Courses</h1>
        {/* Note that I have to create an anonymous function
          or the click handler will immediately fire!
          Also, note the structure of this comment, have to
          create an empty JS expression to comment since this is
          all parsed as JS */}
        <input type="submit" value="Add Course" className="btn btn-primary" onClick={this.redirectToAddCoursePage} />
        {
          courses.length > 0 &&
          <CourseList
            deleteCourse={this.deleteCourse}
            courses={courses}/>
        }
      </div>
    );
  }
}

CoursePage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  coursesLoaded: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return state.courses;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
