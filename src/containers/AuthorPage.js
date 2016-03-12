import React, {PropTypes} from 'react';
import AuthorList from '../components/AuthorList';
import * as authorActions from '../actions/authorActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class AuthorPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //load author data if it hasn't already been loaded.
    if (this.props.appState.authors.length == 0) {
      this.props.actions.loadAuthors();
    }
  }

  render() {
    return (
      <div>
        <h1>Authors</h1>
        <AuthorList
          authors={this.props.appState.authors}
          deleteAuthor={this.props.actions.deleteAuthor} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    appState: state.authorReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

AuthorPage.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired
};

const connectedAuthorPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorPage);

export default connectedAuthorPage;
