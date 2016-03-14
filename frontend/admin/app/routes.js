import React from 'react';
import { Route } from 'react-router';
import App from './containers/App'
import Orders from './containers/Orders'
import Dashboard from './containers/Dashboard'
import Services from './containers/Services'

export default (
  <Route path="/" component={App}>
    <Route path="/orders"
           component={Orders} />
    <Route path="/services"
           component={Services}/>
      <Route path="/dashboard"
             component={Dashboard}/>
  </Route>
);