import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect';
import {reduxForm} from 'redux-form';
import {createToken} from 'actions/token'
import  classnames  from 'classnames'

class Login extends Component {
    constructor (props) {
        super(props)
        this.handleLoginClick = this.handleLoginClick.bind(this)
    }

    handleLoginClick (e) {
        this.props.createToken(this.refs.username.value, this.refs.password.value);
        e.preventDefault();
    }

    render () {
        let message;
        const {fields: {username, password}, handleSubmit, submitting, invalid} = this.props;
        const spinner = submitting ? <i className="fa fa-spin fa-spinner"></i> : '';

        // if (this.props.page.errorMessage) {
        //     message =
        //         <div className="alert alert-danger">
        //             {this.props.page.errorMessage}
        //         </div>
        // }
        // if (this.props.page.isFetching){
        //     spinner =
        //         <i className="fa fa-spin fa-spinner"></i>
        // }
        return (
            <div className="col-sm-3 col-sm-offset-4 login-form">
                {message}
                <form className="form-horizontal">
                    <div className={classnames("form-group",{"has-error":username.error})}>
                        <label className="col-sm-3 control-label">Username</label>
                        <div className="col-sm-9">
                            <input type="text" ref="username" className="form-control"
                                   placeholder="Username" {...username}/>
                        </div>
                    </div>
                    <div className={classnames("form-group",{"has-error":password.error})}>
                        <label className="col-sm-3 control-label">Password</label>
                        <div className="col-sm-9">
                            <input type="password" ref="password" className="form-control"
                                   placeholder="Password" {...password}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-3 col-sm-9">
                            <button type="submit" className="btn btn-primary" disabled={invalid || submitting} onClick={this.handleLoginClick}>
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
    createToken: PropTypes.func.isRequired
}

export const selector = createSelector(
    state => state.pages.login,
    page => {
        return {
            page
        }
    }
);

function validate (data) {
    const errors = {};
    if (!data.username) errors.username = 'Required';
    if (!data.password) errors.password = 'Required';

    return errors;
}

export default reduxForm({
        form: 'login',
        fields: [
            'username',
            'password'
        ],
        validate
    },
    (state)=> {
        return {
            initialValues: {
                username:'erau',
                password:'password_0'
            }
        }
    }, {
        createToken
    })(Login)