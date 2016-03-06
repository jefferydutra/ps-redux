import React, {PropTypes} from 'react';
import AuthorList from '../components/AuthorList';

class AuthorPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //load author data if it hasn't already been loaded.
    debugger;
    if (this.props.appState.authors.length == 0) {
      this.props.actions.loadAuthors();
    }
  }

  render() {
    return (
      <div>
        <h1>Authors</h1>

      </div>
    );
  }
}

AuthorPage.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired
};

export default AuthorPage;
