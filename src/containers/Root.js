// This root container is likely to look the same for each App
// that uses react-redux with React Router. Uses React-redux's Provider
// component which wraps all child components
import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import routes from '../routes';
import { Router } from 'react-router';

export default class Root extends Component {
  render() {
    /* Provider makes the store available to all child components
      This way you have to explicitly pass the store to all child components! Handy.
       */
    return (
      <Provider store={this.props.store}>
        <Router history={this.props.history} routes={routes} />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
