import React from 'react';
import { Route } from 'react-router';
import App from './containers/App'
import Login from './containers/Login'
import Dashboard from './containers/Dashboard'
import Services from './containers/Services'

export default (
  <Route path="/" component={App}>
    <Route path="/login"
           component={Login} />
    <Route path="/dashboard"
           component={Dashboard}/>
    <Route path="/services"
           component={Services}/>
  </Route>
);