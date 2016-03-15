import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect';
import {reduxForm} from 'redux-form';
import  classnames  from 'classnames'

import {pageActivate} from 'actions/pages/index';
import LoginForm from 'components/LoginForm'
import {createToken} from 'actions/token'
import NavBar from 'containers/NavBarPublic'

@connect(null, {
    createToken,
    pageActivate:()=>pageActivate('login')
})
export default class LoginPage extends Component {
    static propTypes = {
        createToken1: PropTypes.func.isRequired
    };

    constructor (props) {
        super(props)
    }
    componentWillMount () {
        this.props.pageActivate();
    }

    render () {
        return (
            <div>
                <NavBar/>
                <div className="col-sm-4 col-sm-offset-4 login-form">
                    <LoginForm onSubmit={data=>this.props.createToken(data.username, data.password)}/>
                </div>
            </div>
        )
    }
}