import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect';
import {reduxForm} from 'redux-form';
import  classnames  from 'classnames'

import {pageActivate} from 'actions/pages/index';
import NavBar from 'containers/NavBar';

@connect(null, {
    pageActivate:()=>pageActivate('dashboard')
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
        return (
            <div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium alias assumenda consectetur dolores eius esse et excepturi exercitationem fugit harum ipsa ipsum, nostrum pariatur provident quod quos reprehenderit soluta!
                </p>
            </div>
        )
    }
}