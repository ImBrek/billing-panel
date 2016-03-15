import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import font from 'font-awesome/css/font-awesome.css';
import { connect } from 'react-redux';
import { Router } from 'react-router'

import bs from 'bootstrap/dist/css/bootstrap.css';
import styles from 'css/index.css';
import routes from '../routes'

class Root extends Component {
    render() {
        const {store, history} = this.props;
        return (
            <Provider store={store}>
                <div className="app">
                    <Router history={history} routes={routes}/>
                </div>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, {})(Root);
