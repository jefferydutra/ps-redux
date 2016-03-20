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

    if (authorId) {
      this.props.actions.loadAuthors().then(() => {
        this.setState({author: this.props.authors.find( (author) => author.id == authorId) });
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

	setAuthorState(event) {
    this.formIsDirty = true;
		const field = event.target.name;
		const value = event.target.value;
    const author = this.state.author;
		author[field] = value;
		return this.setState({author: this.state.author});
	}

	authorFormIsValid() {
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

		if (!this.authorFormIsValid()) {
			return;
		}

    this.formIsDirty = false;

		if (this.state.author.id) {
			this.props.actions.updateAuthor(this.state.author);
		} else {
			this.props.actions.createAuthor(this.state.author);
		}

    notie.alert(1, 'Author saved.');
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

ManageAuthorPage.propTypes = {
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  author: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  }),
  params: PropTypes.object,
  route: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageAuthorPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

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

const connectedManageAuthorPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageAuthorPage);

export default connectedManageAuthorPage;
