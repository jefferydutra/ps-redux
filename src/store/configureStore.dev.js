// This file configures the store for hot reloading
// and sets up any desired middleware

import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

// Create store takes three parameters: http://redux.js.org/docs/api/createStore.html
// 1. Root reducer
// 2. Initial State
// 3. Enhancer function
export default function configureStore(initialState) {
  let store = createStore(rootReducer, initialState, compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f //add support for Redux dev tools
      )
    );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
