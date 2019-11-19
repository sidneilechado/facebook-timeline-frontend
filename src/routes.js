import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Feed from './pages/Feed';
import Login from './pages/Login';
import New from './pages/New';
import Register from './pages/Register';
import Auth from './components/Auth';

function Routes() {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/feed" component={Feed} />
      <Route path="/new" component={New} />
    </Switch>
  );
}

export default Routes;
