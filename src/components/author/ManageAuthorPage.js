import React, {PropTypes} from 'react';
import * as authorActions from '../../actions/authorActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AuthorForm from './AuthorForm';
import toastr from 'toastr';

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

    this.setAuthorState = this.setAuthorState.bind(this);
    this.saveAuthor = this.saveAuthor.bind(this);
  }

  componentWillMount() {
    const authorId = this.props.params.id; // from the path '/author:id'

    if (this.props.authorsLoaded) {
      if (authorId) {
        this.populateForm(authorId);
      }
    } else {
      // Option 1 - Use Dispatch directly
      //this.props.dispatch(authorActions.loadAuthors()).then( () => {

      // Option 2 - Use bound actions
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

    // This shows how to fire off code *after* the async action is complete
    // By waiting for the promise executed in the thunk to return.
    // We have to wait in this case because the ID is generated by the API.
    // Otherwise we'd see the course plop in *after* the redirect.
    // Initially, don't do this to show the behavior, then show how using
    // then fixes it and centralize redirectAndNotify.
    this.props.saveAuthor(this.state.author)
      .then( () => this.redirectAndNotify())
      .catch( error => alert(error) );
	}

  redirectAndNotify() {
    this.context.router.push('/authors');
    toastr.success('Author saved.');
  }

	render() {
		return (
			<AuthorForm
				author={this.state.author}
				onChange={this.setAuthorState}
				onSave={this.saveAuthor}
				errors={this.state.errors}
        loading={this.props.loading}  />
		);
	}
}

ManageAuthorPage.propTypes = {
  // State
  authors: PropTypes.array.isRequired,
  authorsLoaded: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,

  // Actions
  //actions: PropTypes.object.isRequired,
  //dispatch: PropTypes.object.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveAuthor: PropTypes.func.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageAuthorPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    authors: state.authors.authors,
    authorsLoaded: state.authors.authorsLoaded,
    loading: state.loadingStatus.ajaxCallsInProgress > 0
  };
  // Example of how to get a URL segment via ownProps.
    // Not actually used, just showing how.
    //urlSegment: ownProps.location.pathname.substring(1)
  //};
}

function mapDispatchToProps(dispatch) {
  // OPTION 1: Use dispatch directly in components.
  // Don't wrap action creators in dispatch.
  // Pass dispatch down to child components
  // But then you have to call dispatch in child components.
  // Example:
  // dispatch(authorActions.loadAuthors()).then( () => {

  // OPTION 2: Manually wrap action creators
  // in dispatch calls to show an alternative
  // to bindActionCreators
  return {
    loadAuthors: () => dispatch(authorActions.loadAuthors()),
    saveAuthor: author => dispatch(authorActions.saveAuthor(author))
  };

  // OPTION 3: bindActionCreators
  // return {
  //   actions: bindActionCreators(authorActions, dispatch)
  // };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
