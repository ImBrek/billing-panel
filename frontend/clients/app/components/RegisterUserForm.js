import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import  classnames  from 'classnames'
import fetch, {API_READ} from 'services/api';

const asyncValidate = (values) => {
    return fetch({
        method: API_READ,
        endpoint: 'users/check',
        queryParams: {
            username: values.username,
            jabber: values.jabber,
            email: values.email
        }
    }).then((data)=> {
        const {error,response} = data;
        if (error) {
            return;
        } else {
            return Promise.reject({
                email:response.email && 'Email is already taken',
                jabber:response.jabber && 'Jabber is already taken',
                username:response.username && 'Username is already taken'
            });
        }
    });
};

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(values.email)) {
            errors.email = 'Email format';
        }
    }
    if (!values.jabber) {
        errors.jabber = 'Required';
    }
    if (!values.username) {
        errors.username = 'Required';
    }
    if (!values.password) {
        errors.password = 'Required';
    }
    if (!values.name) {
        errors.name = 'Required';
    }
    return errors;
};

var a = (new Date().getTime());
@reduxForm({
        form: 'register',
        fields: ['username', 'password', 'email', 'jabber', 'name'],
        asyncValidate,
        validate,
        destroyOnUnmount: false,
        asyncBlurFields: ['username', 'jabber', 'email']
    },
    state => ({
        initialValues: {
            username: 'aa' + a,
            password: 'aa',
            email: a+'bre@ff.ru',
            jabber: 'bre@ff.ru' + a,
            name: 'Вася'
        }
    }))
export default class RegisterForm extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
    };

    render () {
        const {
            fields: {username, password, email, jabber, name},
            handleSubmit,
            submitting,
            asyncValidating,
            invalid
        } = this.props;
        return (
            <form onSubmit={handleSubmit} className="form-horizontal">
                <div className={classnames("form-group",{"has-error":name.error})}>
                    <label className="col-sm-3 control-label">Your name</label>
                    <div className="col-sm-9">
                        <input type="text" maxLength="255" className="form-control" {...name}/>
                    </div>
                </div>
                <div className={classnames("form-group",{"has-error":email.error})}>
                    <label className="col-sm-3 control-label">Email</label>
                    <div className="col-sm-9">
                        <input type="text" maxLength="255" className="form-control" {...email}/>
                        {asyncValidating === 'email' &&
                        <span className="form-control-feedback fa fa-spin fa-spinner"> </span>}
                        {email.error &&
                        <span className="help-block">{email.error}</span>}
                    </div>
                </div>
                <div className={classnames("form-group",{"has-error":jabber.error})}>
                    <label className="col-sm-3 control-label">Jabber</label>
                    <div className="col-sm-9">
                        <input type="text" maxLength="255" className="form-control" {...jabber}/>
                        {asyncValidating === 'jabber' &&
                        <span className="form-control-feedback fa fa-spin fa-spinner"> </span>}
                        {jabber.error &&
                        <span className="help-block">{jabber.error}</span>}
                    </div>
                </div>

                <div className={classnames("form-group has-feedback",{"has-error":username.error})}>
                    <label className="col-sm-3 control-label">Username</label>
                    <div className="col-sm-9">
                        <input type="text" maxLength="255" className="form-control" {...username}/>
                        {asyncValidating === 'username' &&
                        <span className="form-control-feedback fa fa-spin fa-spinner"> </span>}
                        {username.error &&
                        <span className="help-block">{username.error}</span>}
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
                        <button className="btn btn-primary" disabled={submitting || invalid}>
                            {submitting ? <i className="fa fa-spin fa-spinner"></i> : null} Register
                        </button>
                    </div>
                </div>
            </form>)
    }
}
