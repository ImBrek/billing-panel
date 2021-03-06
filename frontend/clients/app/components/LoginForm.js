import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import  classnames  from 'classnames'

@reduxForm({
    form: 'signIn',
    fields: ['username', 'password'],
    destroyOnUnmount: false,
    validate:function(values){
        const errors = {};
        if (!values.username) {
            errors.username = 'Required';
        }
        if (!values.password) {
            errors.password = 'Required';
        }
        return errors;
    }
},state => ({
    initialValues: {
        username: 'reg',
        password: 'password_0',
    }
}))
export default class LoginForm extends Component {
    static propTypes = {
    };

    render () {
        const {
            fields: {username, password},
            handleSubmit,
            error,
            submitting
        } = this.props;
        return (
            <form onSubmit={handleSubmit} className="form-horizontal">
                {error?<div className="alert alert-danger">{error}</div>:null}
                <div className={classnames("form-group",{"has-error":username.error})}>
                    <label className="col-sm-3 control-label">Username</label>
                    <div className="col-sm-9">
                        <input type="text" maxLength="255" className="form-control" {...username}/>
                    </div>
                </div>
                <div className={classnames("form-group",{"has-error":password.error})}>
                    <label className="col-sm-3 control-label">Password</label>
                    <div className="col-sm-9">
                        <input type="password" maxLength="255" className="form-control" {...password}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-3 col-sm-9">
                        <button className="btn btn-primary" disabled={submitting}>{submitting?<i className="fa fa-spin fa-spinner"></i>:null} Sign in</button>
                    </div>
                </div>
            </form>)
    }
}
