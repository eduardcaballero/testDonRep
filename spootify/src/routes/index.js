import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Discover from './Discover';
import CoreLayout from '../common/layouts/CoreLayout';
import LoginLayout from '../common/layouts/LoginLayout';

export default function Routes() {

  return <Router>
    <Switch>
      <Route Route path="/callback">
        <LoginLayout />
      </Route>
      <Route path="/">
        <CoreLayout>
          <Discover />
        </CoreLayout>
      </Route>

    </Switch>
  </Router>;
}
