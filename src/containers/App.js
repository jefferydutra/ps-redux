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
    debugger;
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

// Note that we're using the ownProps param here that
// is sent from React Router because we can't rely
// upon Redux's state since React Router's
// More info: https://github.com/reactjs/react-router-redux#how-do-i-access-router-state-in-a-container-component
function mapStateToProps(state, ownProps) {
  debugger;
  return {
    appState: ownProps
  };
}

function mapDispatchToProps(dispatch) {
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
