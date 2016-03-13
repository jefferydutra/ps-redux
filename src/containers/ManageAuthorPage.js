import React, {PropTypes} from 'react';
import * as authorActions from '../actions/authorActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AuthorForm from '../components/AuthorForm';

class ManageAuthorPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      author: { id: '', firstName: '', lastName: '' },
      errors: {},
      dirty: false
    };
  }

	componentWillMount() {
		const authorId = this.props.params.id; //from the path '/author:id'
		if (authorId) {
			this.setState({author: this.props.appState.authors.find( (author) => author.id == authorId) });
		}
	}

	componentDidMount() {
		const route = this.props.route;
		const router = this.context.router;
		router.setRouteLeaveHook(route, this.routerWillLeave.bind(this));
	}

  routerWillLeave(nextLocation) {
    if (this.state.dirty) {
      return 'Leave without saving?';
    }
  }

	setAuthorState(event) {
		this.setState({dirty: true});
		const field = event.target.name;
		const value = event.target.value;
		this.state.author[field] = value;
		return this.setState({author: this.state.author});
	}

	authorFormIsValid() {
		let formIsValid = true;
		this.state.errors = {}; //clear any previous errors.

		if (this.state.author.firstName.length < 3) {
			this.state.errors.firstName = 'First name must be at least 3 characters.';
			formIsValid = false;
		}

		if (this.state.author.lastName.length < 3) {
			this.state.errors.lastName = 'Last name must be at least 3 characters.';
			formIsValid = false;
		}

		this.setState({errors: this.state.errors});
		return formIsValid;
	}

	saveAuthor(event) {
		event.preventDefault();

		if (!this.authorFormIsValid()) {
			return;
		}

		if (this.state.author.id) {
			this.props.actions.updateAuthor(this.state.author);
		} else {
			this.props.actions.createAuthor(this.state.author);
		}

		//Since setState doesn't immediately mutate this.state, need to set it separately here to assure
		//it's updated for the check in routerWillLeave.
		//More info: https://facebook.github.io/react/docs/component-api.html#setstate
		this.state.dirty = false;
		this.setState({dirty: this.state.dirty});
		alert('Author saved.');
		this.context.router.push('/authors');
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

ManageAuthorPage.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
  params: PropTypes.object,
  route: PropTypes.object.isRequired
};

//Pull in the React Router context.
ManageAuthorPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

const connectedManageAuthorPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageAuthorPage);

export default connectedManageAuthorPage;
