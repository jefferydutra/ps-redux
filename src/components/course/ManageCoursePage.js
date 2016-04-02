import React, {PropTypes} from 'react';
import * as authorActions from '../../actions/authorActions';
import * as courseActions from '../../actions/courseActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CourseForm from './CourseForm';
import toastr from 'toastr';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    //Just using instance var here since it's not used in render.
    this.formIsDirty = false;

    this.state = {
      course: { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' },
      errors: {}
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillMount() {
    const courseId = this.props.params.id; // from the path `/course/:id`

    if (!this.props.authorsLoaded) {
      this.props.authorActions.loadAuthors();
      //this.props.dispatch(authorActions.loadAuthors());
    }

    if (this.props.coursesLoaded) {
      if (courseId) {
        this.populateForm(courseId);
      }
    } else {
      this.props.courseActions.loadCourses().then(() => {
      //this.props.dispatch(courseActions.loadCourses()).then(() => {
        if (courseId) {
          this.populateForm(courseId);
        }
      });
    }
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

  populateForm(courseId) {
    const course = this.props.courses.find((course) => course.id == courseId);
    // NOTE: Must deep copy here or immutableStateInvariant will get cranky
    // because we're trying to mutate state
    this.setState({course: Object.assign({}, course)});
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

    // Waiting for promise to resolve before redirecting and notifying since the
    // course ID is generated via the API. Otherwise, would see course plop
    // in after the redirect.
    this.props.courseActions.saveCourse(this.state.course)
    //this.props.dispatch(courseActions.saveCourse(this.state.course))
      .then( () => this.redirectAndNotify() )
      .catch( error => alert(error) );
  }

  redirectAndNotify() {
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
  courses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    watchHref: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    length: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  })),
  authors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  })),
  loading: PropTypes.bool.isRequired,
  authorsLoaded: PropTypes.bool.isRequired,
  coursesLoaded: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,

  // Actions
  courseActions: PropTypes.object.isRequired,
  authorActions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageCoursePage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses,
    authors: state.authors,
    authorsLoaded: state.authorsLoaded,
    coursesLoaded: state.coursesLoaded,
    loading: state.ajaxCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  // OPTION 1: Don't pass this function to connect.
  // Instead, use dispatch directly in components.
  // Don't wrap action creators in dispatch.
  // Pass dispatch down to child components
  // But then you have to call dispatch at the call site.
  // Example:
  // dispatch(authorActions.loadAuthors())

  // OPTION 2: Manually wrap action creators in dispatch
  // calls to show an alternative to bindActionCreators
  // return {
  //   loadCourses: () => dispatch(loadCourses()),
  //   saveCourse: course => dispatch(saveCourse(course)),
  //   loadAuthors: () => dispatch(loadAuthors());
  // };

  // OPTION 3: bindActionCreators
  // In this case, all the actions in each actions file are bound and available.
  return {
    courseActions: bindActionCreators(courseActions, dispatch),
    authorActions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
