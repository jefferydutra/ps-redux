import React, {Component, PropTypes} from 'react';
import * as authorActions from '../../actions/authorActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import AuthorList from './AuthorList';
import notie from 'notie';

class AuthorPage extends Component {
  componentWillMount() {
    if (this.props.authors.length == 0) {
      this.props.loadAuthors();
    }
  }

  deleteAuthor(event, authorId) {
    event.preventDefault();
    this.props.deleteAuthor(authorId);
    notie.alert(1, 'Author deleted :(');
  }

  render() {
    return (
      <div>
        <h1>Authors</h1>
        <input type="submit" value="Add Author" className="btn btn-primary" onClick={() => {browserHistory.push('/author');}} />
        {
          this.props.authors.length > 0 &&
            <AuthorList
              authors={this.props.authors}
              deleteAuthor={this.deleteAuthor.bind(this)}/>
        }
      </div>
    );
  }
}

AuthorPage.propTypes = {
  loadAuthors: PropTypes.func.isRequired,
  deleteAuthor: PropTypes.func.isRequired,
  authors: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    authors: state.authorReducer.authors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadAuthors: () => dispatch(authorActions.loadAuthors()),
    deleteAuthor: (authorId) => dispatch(authorActions.deleteAuthor(authorId))
  };

  //alternative:
  // return {
  //   actions: bindActionCreators(authorThunks, dispatch)
  // };

  // Then above, you reference via this.props.actions.loadAuthors above instead.
  // A little less typing, also less power to specify the exact desired shape
  // since you now expose all the actions under an actions object.
}

const connectedAuthorPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorPage);

export default connectedAuthorPage;
