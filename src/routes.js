import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AuthorPage from './components/author/AuthorPage';
import ManageAuthorPage from './components/author/ManageAuthorPage';
import CoursePage from './components/course/CoursePage';
import ManageCoursePage from './components/course/ManageCoursePage';
import AboutPage from './components/about/AboutPage';
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="authors" component={AuthorPage} />
    <Route path="author/:id" component={ManageAuthorPage} />
    <Route path="author" component={ManageAuthorPage} />
    <Route path="courses" component={CoursePage} />
    <Route path="course/:id" component={ManageCoursePage} />
    <Route path="course" component={ManageCoursePage} />
    <Route path="about" component={AboutPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
