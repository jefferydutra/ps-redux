// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import * as actions from '../actions/authorActions';
import { syncHistoryWithStore } from 'react-router-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header/>
          <div className="container-fluid">
            {this.props.children}
          </div>
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

// We can use the ownProps param here that
// is sent from React Router to get location data.
// We can't read the location state directly from the Redux store.
// because React Router operates asynchronously
// (to handle things such as dynamically-loaded components)
// and your component tree may not yet be updated in sync with your Redux state
// More info: https://github.com/reactjs/react-router-redux#how-do-i-access-router-state-in-a-container-component
function mapStateToProps(state, ownProps) {
  return {
    appState: state.authorReducer
  };
}

function mapDispatchToProps(dispatch) {
  //this method would send all actions down...
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

// connect is a function provided by react-redux
// that generates your container component for you.
// You pass it two functions:
// 1. A function that describes how to map state to props
// 2. A function that describes how to map your dispatch
//    actions to props
// Finally, you pass it your top-level component, which
// in this case is called app. Now this looks odd because
// connect returns a partially applied function.
// The results of that function are then passed our App
// component. You don't have to understand this syntax to
// work with Redux. The point is the result of this call
// is our top level app component is subscribed to our
// Redux store so that it's notified when state changes.
// That's why the function is called connect.
const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default connectedApp;
