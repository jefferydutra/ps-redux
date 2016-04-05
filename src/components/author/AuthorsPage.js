import React, {PropTypes} from 'react';
import * as authorActions from '../../actions/authorActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import AuthorList from './AuthorList';
import toastr from 'toastr';

class AuthorsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.deleteAuthor = this.deleteAuthor.bind(this);
    this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
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

AuthorsPage.propTypes = {
  // Data
  authors: PropTypes.array.isRequired,

  // Actions
  deleteAuthor: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    authors: state.authors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteAuthor: authorId => dispatch(authorActions.deleteAuthor(authorId))
  };

  //alternative:
  // return {
  //   actions: bindActionCreators(authorThunks, dispatch)
  // };

  // Then above, you reference via this.props.actions.loadAuthors above instead.
  // A little less typing, also less power to specify the exact desired shape
  // since you now expose all the actions under an actions object.
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
