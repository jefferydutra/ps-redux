import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import routes from './routes';
import {loadAuthors} from './actions/authorActions';
import {loadCourses} from './actions/courseActions';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; //Webpack can import CSS files too!
import '../node_modules/toastr/build/toastr.min.css';
import './styles/styles.css';

const store = configureStore();

// Dispatch actions to load initial state.
// Alternatively, if server-rendering, could
// have injected JSON into the page, and passed
// that into configureStore as the initialData.
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
