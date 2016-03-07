import React from 'react';
import { Link, IndexLink } from 'react-router';

export default function Header() {
	return (
      <nav>
          <IndexLink to="/" activeClassName="active">Home</IndexLink> {" | "}
          <Link to="/authors" activeClassName="active">Authors</Link> {" | "}
          <Link to="/about" activeClassName="active">About</Link>
      </nav>
	);
}
