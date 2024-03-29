import React, {PropTypes} from 'react';
import * as courseActions from '../../actions/courseActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import CourseList from './CourseList';
import toastr from 'toastr';

//Note that this is a controller view, which is why it gets data
//and passes it down to child components via props.
class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.deleteCourse = this.deleteCourse.bind(this);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  deleteCourse(event, courseId) {
    event.preventDefault();
    this.props.actions.deleteCourse(courseId)
      .then( () => toastr.success('Course deleted.'));
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  render() {
    const {courses} = this.props;
    return (
      <div>
        <h1>Courses</h1>
        {/* Note that I don't create an anonymous function
          for the onclick because creating functions
          in render should be avoided for performance.
          Also, note the structure of this comment, have to
          create an empty JS expression to comment since this is
          all parsed as JS */}
        <input type="submit"
               value="Add Course"
               className="btn btn-primary"
               onClick={this.redirectToAddCoursePage} />
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

CoursesPage.propTypes = {
  // Data
  courses: PropTypes.array.isRequired,

  // Actions
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
