import React, {PropTypes} from 'react';
import * as courseActions from '../../actions/courseActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: { id: null, watchHref: '', title: '', author: '', length: '', category: '' },
      dirty: false,
      errors: {}
    };
  }

  componentWillMount() {
    debugger;
    const courseId = this.props.params.id; // from the path `/course/:id`
    if (courseId) {
      this.setState({course: this.props.courses.find( (course) => course.id == courseId) });
    }
  }

  componentDidMount() {
    const route = this.props.route;
    const router = this.context.router;
    router.setRouteLeaveHook(route, this.routerWillLeave.bind(this));
  }

  routerWillLeave(nextLocation) {
    if (this.state.dirty) {
      return 'Leave without saving?';
    }
  }

  getAuthorsFormattedForDropdown(author) {
    debugger;
    return this.props.authors.map((author) => {
      return {
        value: author.id,
        text: author.firstName + ' ' + author.lastName
      };
    });
  }

  courseFormIsValid() {
    let formIsValid = true;

    if (this.state.course.length < 5) {
      this.state.errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    if (!this.state.course.author) {
      this.state.errors.author = 'Author is required';
      formIsValid = false;
    }

    this.setState({errors: this.state.errors});
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();

    if (!this.courseFormIsValid()) {
      return;
    }

    this.setState({dirty: false});

    if (this.state.course.id) {
      this.props.actions.updateCourse(this.state.course);
    } else {
      this.props.actions.createCourse(this.state.course);
    }

    alert('Course saved.');
    this.context.router.push('/courses');
  }

  //This is a centralized change handler
  //Could have validate method delegate to this
  //This is useful for elements that want validation
  //onBlur instead of onChange (which is where the validate
  //function is typically mapped)
  updateCourseState(event) {
    this.setState({dirty: true});
    const field = event.target.name;
    this.state.course[field] = event.target.value;
    return this.setState({course: this.state.course});
  }

  render() {
    const allAuthors = this.getAuthorsFormattedForDropdown();
    return (
      <CourseForm
        course={this.state.course}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        allAuthors={allAuthors}
        errors={this.state.errors} />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courseReducer.courses,
    authors: state.authorReducer.authors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

ManageCoursePage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.object.isRequired,
  authors: PropTypes.object.isRequired,
  params: PropTypes.object,
  route: PropTypes.object.isRequired
};

//Pull in the React Router context.
ManageCoursePage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

const connectedManageCoursePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);

export default connectedManageCoursePage;
