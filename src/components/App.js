// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Header from './common/Header';

const App = ({children}) => {
  return (
    <div>
      <Header/>
      <div className="container-fluid">
        {children}
      </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
