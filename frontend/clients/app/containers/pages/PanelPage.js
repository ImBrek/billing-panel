import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect';
import {reduxForm} from 'redux-form';
import  classnames  from 'classnames'

import {pageActivate} from 'actions/pages/index';
import NavBar from 'containers/NavBar';
import {UserIsAuthenticated} from 'containers/AuthWrappers';

@UserIsAuthenticated
@connect(null, {
    pageActivate:()=>pageActivate('panel')
})
export default class LoginPage extends Component {
    static propTypes = {
    };

    constructor (props) {
        super(props)
    }
    componentWillMount () {
        this.props.pageActivate();
    }

    render () {
        console.log(this.props.children);
        return (
            <div>
                <NavBar/>
                {this.props.children}
            </div>
        )
    }
}