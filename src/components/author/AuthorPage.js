import React, {PropTypes} from 'react';
import * as authorActions from '../../actions/authorActions';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AuthorList from './AuthorList';

class AuthorPage extends React.Component {
  componentWillMount() {
    //load author data if it hasn't already been loaded.
    if (this.props.appState.authors.length == 0) {
      this.props.actions.loadAuthors();
    }
  }

  deleteAuthor(event, authorId) {
    event.preventDefault();
    this.props.actions.deleteAuthor(authorId);
    alert('Author deleted.');
  }

  render() {
    return (
      <div>
        <h1>Authors</h1>
        <Link to="/author" className="btn btn-default">Add Author</Link>
        <AuthorList
          authors={this.props.appState.authors}
          deleteAuthor={this.deleteAuthor.bind(this)} />
      </div>
    );
  }
}

AuthorPage.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired
};

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

const connectedAuthorPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorPage);

export default connectedAuthorPage;
