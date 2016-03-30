import React, {PropTypes} from 'react';
import { Link } from 'react-router';

class AuthorListRow extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.deleteAuthor = this.deleteAuthor.bind(this);
  }

  deleteAuthor(event) {
    this.props.deleteAuthor(event, this.props.author.id);
  }

  render() {
    const {author} = this.props;

    return (
      <tr key={author.id}>
        <td><a href="#" onClick={this.deleteAuthor}>Delete</a></td>
        <td><Link to={'/author/' + author.id}>{author.id}</Link></td>
        <td>{author.firstName} {author.lastName}</td>
      </tr>
    );
  }
}

AuthorListRow.propTypes = {
  author: PropTypes.object.isRequired,
  deleteAuthor: PropTypes.func.isRequired
};

export default AuthorListRow;

