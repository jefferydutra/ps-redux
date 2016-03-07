// Since the about page needs no
// data or actions, this doesn't
// contain the usual Redux container boilerplate
// for mapState and mapDispatch.
import React, {PropTypes} from 'react';

const AboutPage = () => {
    return (
      <div>
        <h1>About</h1>
        <p>This application uses React, Redux, React Router and a variety of other helpful libraries.</p>
      </div>
    );
};

export default AboutPage;
