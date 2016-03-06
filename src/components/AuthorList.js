import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const AuthorList = (props) => {
  const createAuthorRow = (author) => {
    return (
      <tr key={author.id}>
        <td><a href="#" onClick={props.deleteAuthor.bind(author.id)}>Delete</a></td>
        <td><Link to={'/author/' + author.id}>{author.id}</Link></td>
        <td>{author.firstName} {author.lastName}</td>
      </tr>
    );
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {props.authors.map(createAuthorRow, this)}
        </tbody>
      </table>
    </div>
  );
};

AuthorList.props = {
  authors: PropTypes.array.isRequired
};

module.exports = AuthorList;
