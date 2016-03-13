import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const AuthorList = (props) => {
  const deleteAuthor = (event, authorId) => {
    event.preventDefault();
    props.deleteAuthor(authorId);
    alert('Author deleted.');
  };

  const createAuthorRow = (author) => {
    return (
      <tr key={author.id}>
        <td><a href="#" onClick={(event) => deleteAuthor(event, author.id)}>Delete</a></td>
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
          {props.authors.map(createAuthorRow)}
        </tbody>
      </table>
    </div>
  );
};

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired,
  deleteAuthor: PropTypes.func.isRequired
};

module.exports = AuthorList;
