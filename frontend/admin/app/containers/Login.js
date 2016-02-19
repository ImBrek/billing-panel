import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';

import {login} from 'actions/tokens'

class Login extends Component {
    constructor(props) {
        super(props)
        this.handleLoginClick = this.handleLoginClick.bind(this)
    }

    handleLoginClick(e) {
        this.props.login(this.refs.username.value, this.refs.password.value);
        e.preventDefault();
    }

    render() {
        let message;
        let spinner;
        if (this.props.page.errorMessage) {
            message =
                <div className="alert alert-danger">
                    {this.props.page.errorMessage}
                </div>
        }
        if (this.props.page.isFetching){
            spinner =
                <i className="fa fa-spin fa-spinner"></i>
        }
        return (
            <div className="col-sm-3 col-sm-offset-4 login-form">
                {message}
                <form onSubmit={this.handleLoginClick}>
                    <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Username</label>
                        <div className="col-sm-9">
                            <input type="text" ref="username" className="form-control" placeholder="Username" defaultValue="vagrant"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Password</label>
                        <div className="col-sm-9">
                            <input type="password" ref="password" className="form-control" placeholder="Password" defaultValue="vagrant"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-offset-3 col-sm-9">
                            <button type="submit" className="btn btn-primary">
                                {spinner} Sign in
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired
}

export const selector = createSelector(
    state => state.pages.login,
    page => {
        return {
            page
        }
    }
);

export default connect(selector, {
    login
})(Login)