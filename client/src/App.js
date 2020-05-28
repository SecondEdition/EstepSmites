import React, { Fragment } from 'react';
import NavMenu from './Home/NavMenu';


// from: https://react-bootstrap.github.io/getting-started/introduction
import 'bootstrap/dist/css/bootstrap.min.css'; // <--- what does including this do, really? 

function App() {
  return (
    <Fragment> 
      <NavMenu />
    </Fragment>
  );
}

export default App;
