import React, {PropTypes} from 'react';
import { Link } from 'react-router';

class CourseListRow extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  deleteCourse(event) {
    this.props.deleteCourse(event, this.props.course.id);
  }

  render() {
    const {course} = this.props;

    return (
      <tr>
        <td><a href={course.watchHref} target="_blank">Watch</a></td>
        <td><a href="#" onClick={this.deleteCourse}>Delete</a></td>
        <td><Link to={'/course/' + course.id}>{course.title}</Link></td>
        <td>{course.authorId}</td>
        <td>{course.category}</td>
        <td>{course.length}</td>
      </tr>
    );
  }
}

CourseListRow.propTypes = {
  course: PropTypes.object.isRequired,
  deleteCourse: PropTypes.func.isRequired
};

export default CourseListRow;
