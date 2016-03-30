import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const AuthorList = ({authors, deleteAuthor}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {
          authors.map((author) => {
            return (
              <tr key={author.id}>
                <td><a href="#" onClick={(event) => deleteAuthor(event, author.id)}>Delete</a></td>
                <td><Link to={'/author/' + author.id}>{author.id}</Link></td>
                <td>{author.firstName} {author.lastName}</td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired,
  deleteAuthor: PropTypes.func.isRequired
};

export default AuthorList;
