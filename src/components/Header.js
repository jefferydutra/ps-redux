import React from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
	return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
            <IndexLink to="/" className="navbar-brand" activeClassName="active">
              <img src="images/pluralsight-logo.png" />
            </IndexLink>
            <ul className="nav navbar-nav">
              <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
              <li><Link to="/authors" activeClassName="active">Authors</Link></li>
              <li><Link to="/about" activeClassName="active">About</Link></li>
            </ul>
        </div>
      </nav>
	);
};

module.exports = Header;
