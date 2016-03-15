import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {createSelector} from 'reselect';
import { push } from 'react-router-redux'

import DialogsManager from 'components/DialogsManager'
import Login from './pages/LoginPage'
import NavBar from 'containers/NavBar'


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
@connect(selector, {
    push
})
export default class App extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        const {children, token} = this.props;
        if (token && token.accessToken) {
            return (
                <div>
                    <NavBar/>
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

