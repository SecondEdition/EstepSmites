import React, { Fragment } from 'react';
import Title from './Home/Title';


// from: https://react-bootstrap.github.io/getting-started/introduction
import 'bootstrap/dist/css/bootstrap.min.css'; // <--- what does including this do, really? 

function App() {
  return (
    <Fragment> 
      <Title />
    </Fragment>
  );
}

export default App;
