import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import AuthorPage from './containers/AuthorPage';
import ManageAuthorPage from './containers/ManageAuthorPage';
import AboutPage from './containers/AboutPage';
import NotFoundPage from './containers/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="authors" component={AuthorPage} />
    <Route path="author/:id" component={ManageAuthorPage} />
    <Route path="author" component={ManageAuthorPage} />
    <Route path="about" component={AboutPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
