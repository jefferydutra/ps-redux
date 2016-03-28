import React, {PropTypes} from 'react';
import * as authorActions from '../../actions/authorActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AuthorForm from './AuthorForm';
import notie from 'notie';

class ManageAuthorPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    // Just using instance var here since it's not used in render.
    // Proof that this is cool. https://github.com/facebook/react/blob/master/src/addons/transitions/ReactTransitionGroup.js#L42-L44
    this.formIsDirty = false;

    this.state = {
      author: { id: '', firstName: '', lastName: '' },
      errors: {}
    };
  }

  componentWillMount() {
    const authorId = this.props.params.id; // from the path '/author:id'

    if (this.props.authorsLoaded) {
      if (authorId) {
        this.populateForm(authorId);
      }
    } else {
      this.props.loadAuthors().then( () => {
        if (authorId) {
          this.populateForm(authorId);
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

  populateForm(authorId) {
    const author = this.props.authors.find( (author) => author.id == authorId);
    // NOTE: Must deep copy here or immutableStateInvariant will get cranky
    // because we're trying to mutate state
    this.setState({author: Object.assign({}, author) });
  }

	setAuthorState(event) {
    this.formIsDirty = true;
		const field = event.target.name;
		const value = event.target.value;
    const author = this.state.author;
		author[field] = value;
		return this.setState({author: this.state.author});
	}

	formIsValid() {
		let formIsValid = true;
		let errors = {};

		if (this.state.author.firstName.length < 3) {
			errors.firstName = 'First name must be at least 3 characters.';
			formIsValid = false;
		}

		if (this.state.author.lastName.length < 3) {
			errors.lastName = 'Last name must be at least 3 characters.';
			formIsValid = false;
		}

		this.setState({errors: errors});
		return formIsValid;
	}

	saveAuthor(event) {
		event.preventDefault();

		if (!this.formIsValid()) {
			return;
		}

    this.formIsDirty = false;

		if (this.state.author.id) {
			this.props.updateAuthor(this.state.author);
      // Do this immediately since optimistically updating.
      this.redirectAndNotify();
    } else {
      // This shows how to fire off code *after* the async action is complete
      // By waiting for the promise executed in the thunk to return.
      // We have to wait in this case because the ID is generated by the API.
      // Otherwise we'd see the course plop in *after* the redirect.
      // Initially, don't do this to show the behavior, then show how using
      // then fixes it and centralize redirectAndNotify.
			this.props.createAuthor(this.state.author)
        .then( () => this.redirectAndNotify() );
		}
	}

  redirectAndNotify() {
    this.context.router.push('/authors');
    notie.alert(1, 'Author saved.');
  }

	render() {
		return (
			<AuthorForm
				author={this.state.author}
				onChange={this.setAuthorState.bind(this)}
				onSave={this.saveAuthor.bind(this)}
				errors={this.state.errors} />
		);
	}
}

ManageAuthorPage.propTypes = {
  authors: PropTypes.array.isRequired,
  authorsLoaded: PropTypes.bool.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  createAuthor: PropTypes.func.isRequired,
  updateAuthor: PropTypes.func.isRequired,
  //actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageAuthorPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return state.authorReducer;
}

function mapDispatchToProps(dispatch) {
  // return {
  //   actions: bindActionCreators(authorActions, dispatch)
  // };

  // Manually wrapping action creators
  // in dispatch calls to show an alternative
  // to bindActionCreators
  return {
    loadAuthors: () => dispatch(authorActions.loadAuthors()),
    createAuthor: author => dispatch(authorActions.createAuthor(author)),
    updateAuthor: author => dispatch(authorActions.updateAuthor(author))
  };

  // Or, final option: Don't even wrap.
  // But then you have to call dispatch in child components.
}

const connectedManageAuthorPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageAuthorPage);

export default connectedManageAuthorPage;
