// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Header from './common/Header';

class App extends React.Component {
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
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  authorCount: PropTypes.number.isRequired,
  courseCount: PropTypes.number.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loadingStatus.ajaxCallsInProgress > 0,
    authorCount: state.authors.authors.length,
    courseCount: state.courses.courses.length
  };
}

export default connect(mapStateToProps)(App);
