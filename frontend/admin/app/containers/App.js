import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {createSelector} from 'reselect';

import DialogsManager from 'components/DialogsManager'
import Login from './Login'

class App extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        const {children, inputValue, token} = this.props;
        if (true || token && token.accessToken) {
            return (
                <div>
                    {children}
                    <DialogsManager dialog={this.props.dialog}/>
                </div>
            )
        } else {
            return <Login/>;
        }
    }
}

App.propTypes = {
    children: PropTypes.node
}

export const selector = createSelector(
    state => state.dialog,
    state => state.token,
    (dialog, token)=> {
        return {
            dialog,
            token
        }
    }
);

export default connect(selector, {})(App)