import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Home from './Components/Home/Home';

const App = () => {

  return (

    <>
      <Switch>
        <Route exact path="/" component={ Home } />
      </Switch>
    </>

  )

}

export default App; 