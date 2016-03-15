import React from 'react';
import {Route} from 'react-router';
import App from 'containers/App'
import LoginPage from 'containers/pages/LoginPage'
import OrdersPage from 'containers/pages/OrdersPage'
import DashboardPage from 'containers/pages/DashboardPage'
import ServicesPage from 'containers/pages/ServicesPage'

export default (
    <Route path="/" component={App}>
        <Route path="orders" component={OrdersPage}/>
        <Route path="dashboard" component={DashboardPage}/>
        <Route path="services" component={ServicesPage}/>
    </Route>
);
