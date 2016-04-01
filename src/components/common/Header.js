import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({loading, authorCount, courseCount}) => {
	return (
		<nav>
			<IndexLink to="/" activeClassName="active">Home</IndexLink>
			{" | "}
			<Link to="/authors" activeClassName="active">Authors {authorCount > 0 && `(${authorCount})`}</Link>
			{" | "}
			<Link to="/courses" activeClassName="active">Courses {courseCount > 0 && `(${courseCount})`}</Link>
			{" | "}
			<Link to="/about" activeClassName="active">About</Link>
      {loading && <LoadingDots interval={100} dots={20} />}
    </nav>
	);
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
  authorCount: PropTypes.number.isRequired,
  courseCount: PropTypes.number.isRequired
};

export default Header;
