// This file configures the store for hot reloading
// and sets up any desired middleware

import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  let store;
  if (window.devToolsExtension) { //Enable Redux devtools if the extension is installed in developer's browser
    store = window.devToolsExtension()(createStore)(
      rootReducer,
      initialState,
      applyMiddleware(thunk)
    );
  } else {
    store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunk)
    );
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
