import React from 'react';
import {Route} from 'react-router';
import App from 'containers/App'
import OrdersPublic from 'containers/pages/ordersPublic/OrdersPublic'
import LoginPage from 'containers/pages/LoginPage'
import PanelPage from 'containers/pages/PanelPage'
import OrdersPage from 'containers/pages/OrdersPage'
import DashboardPage from 'containers/pages/DashboardPage'

export default (
    <Route path="/" component={App}>
        <Route path="orders" component={OrdersPublic}/>
        <Route path="login" component={LoginPage}/>
        <Route path="panel" component={PanelPage}>
            <Route path="orders" component={OrdersPage}/>
            <Route path="dashboard" component={DashboardPage}/>
            <Route path="*" component={DashboardPage}/>
        </Route>
    </Route>
);
