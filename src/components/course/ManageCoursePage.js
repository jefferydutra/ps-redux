import React, {PropTypes} from 'react';
import * as courseActions from '../../actions/courseActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CourseForm from './CourseForm';
import NotFoundPage from '../NotFoundPage';
import toastr from 'toastr';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    //Just using instance var here since it's not used in render.
    this.formIsDirty = false;

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentDidMount() {
    const route = this.props.route;
    const router = this.context.router;
    router.setRouteLeaveHook(route, this.routerWillLeave.bind(this));
  }

  routerWillLeave(nextLocation) {
    if (this.formIsDirty) {
      return 'Leave without saving?';
    }
  }

  getAuthorsFormattedForDropdown() {
    return this.props.authors.map((author) => {
      return {
        value: author.id,
        text: author.firstName + ' ' + author.lastName
      };
    });
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    if (!this.state.course.authorId) {
      errors.authorId = 'Author is required';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();

    if (!this.courseFormIsValid()) {
      return;
    }

    this.formIsDirty = false;
    this.setState({saving: true});

    // Waiting for promise to resolve before redirecting and notifying since the
    // course ID is generated via the API. Otherwise, would see course plop
    // in after the redirect.
    this.props.actions.saveCourse(this.state.course)
    //this.props.dispatch(courseActions.saveCourse(this.state.course))
      .then( () => this.redirectAndNotify() )
      .catch( error => alert(error) );
  }

  redirectAndNotify() {
    this.setState({saving: false});
    toastr.success('Course saved.');
    this.context.router.push('/courses');
  }

  // This is a centralized change handler
  // Could have validate method delegate to this
  // This is useful for elements that want validation
  // onBlur instead of onChange (which is where the validate
  // function is typically mapped)
  updateCourseState(event) {
    this.formIsDirty = true;
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  render() {
    if (this.props.display404) return <NotFoundPage/>;
    if (this.state.loading && !this.state.saving) return null;

    return (
      <CourseForm
        course={this.state.course}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        //onSave={(course) => this.props.dispatch(this.saveCourse(course))}
        allAuthors={this.getAuthorsFormattedForDropdown()}
        loading={this.props.loading}
        errors={this.state.errors} />
    );
  }
}

ManageCoursePage.propTypes = {
  // Data
  course: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    watchHref: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    length: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  }).isRequired,
  authors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  })).isRequired,
  loading: PropTypes.bool.isRequired,
  display404: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,

  // Actions
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageCoursePage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id == id);
  if (course) return course[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id; // from the path `/course/:id`
  let display404 = false;
  let course = { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' };

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
    if (!course) display404 = true;
  }

  // Note that I can leave the right-hand side off in ES6 if it matches the left.
  return {
    course,
    authors: state.authors,
    loading: state.ajaxCallsInProgress > 0,
    display404
  };
}

function mapDispatchToProps(dispatch) {
  // OPTION 1: Don't pass this function to connect.
  // Instead, use dispatch directly in components.
  // Don't wrap action creators in dispatch.
  // Pass dispatch down to child components
  // But then you have to call dispatch at the call site.
  // Example:
  // dispatch(courseActions.saveCourse())

  // OPTION 2: Manually wrap action creators in dispatch
  // calls to show an alternative to bindActionCreators
  // return {
  //   saveCourse: course => dispatch(saveCourse(course)),
  // };

  // OPTION 3: bindActionCreators
  // In this case, all the actions in each actions file are bound and available.
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
