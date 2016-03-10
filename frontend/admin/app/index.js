import React from 'react';
import { render } from 'react-dom';
import Root from 'containers/Root.dev';
import configureStore from 'store/configureStore';
import {Provider} from 'react-redux';
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import 'babel-polyfill'

import {login} from 'actions/tokens';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Root store={store} history={history}/>,
    document.getElementById('root')
);
