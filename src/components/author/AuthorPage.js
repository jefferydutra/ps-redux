import React, {Component, PropTypes} from 'react';
import * as authorActions from '../../actions/authorActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import AuthorList from './AuthorList';
import toastr from 'toastr';

class AuthorPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.deleteAuthor = this.deleteAuthor.bind(this);
    this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
  }

  componentWillMount() {
    if (!this.props.authorsLoaded) {
      this.props.loadAuthors();
    }
  }

  deleteAuthor(event, authorId) {
    event.preventDefault();
    this.props.deleteAuthor(authorId);
    toastr.success('Author deleted.');
  }

  redirectToAddAuthorPage() {
    browserHistory.push('/author');
  }

  render() {
    const {authors} = this.props;
    return (
      <div>
        <h1>Authors</h1>
        <input type="submit" value="Add Author" className="btn btn-primary" onClick={this.redirectToAddAuthorPage} />
        {
          authors.length > 0 &&
            <AuthorList
              authors={authors}
              deleteAuthor={this.deleteAuthor}/>
        }
      </div>
    );
  }
}

AuthorPage.propTypes = {
  // Data
  authors: PropTypes.array.isRequired,
  authorsLoaded: PropTypes.bool.isRequired,

  // Actions
  deleteAuthor: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    authors: state.authors,
    authorsLoaded: state.authorsLoaded
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPage);
