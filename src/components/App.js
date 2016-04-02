// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {loadAuthors} from '../actions/authorActions';
import {loadCourses} from '../actions/courseActions';
import Header from './common/Header';

class App extends React.Component {
  componentWillMount() {
    this.props.loadCourses();
    this.props.loadAuthors();
  }

  render() {
    return (
      <div className="container-fluid">
        <Header
          loading={this.props.loading}
          authorCount={this.props.authorCount}
          courseCount={this.props.courseCount} />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  // Data
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  authorCount: PropTypes.number.isRequired,
  courseCount: PropTypes.number.isRequired,

  // Actions
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    authorCount: state.authors.length,
    courseCount: state.courses.length,
    loading: state.ajaxCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadCourses: () => dispatch(loadCourses()),
    loadAuthors: () => dispatch(loadAuthors())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
