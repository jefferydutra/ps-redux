import React, {Component, PropTypes} from 'react';
import * as authorActions from '../../actions/authorActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import AuthorList from './AuthorList';

class AuthorPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired
  };

  componentWillMount() {
    this.props.actions.loadAuthors();
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
        <input type="submit" value="Add Author" className="btn btn-default" onClick={() => {browserHistory.push('/author');}} />
        <AuthorList
          authors={this.props.authors}
          deleteAuthor={this.deleteAuthor.bind(this)} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    authors: state.authorReducer.authors
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
