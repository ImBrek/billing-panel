import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import  classnames  from 'classnames'
import {createSelector} from 'reselect';
import {createToken, deleteToken} from 'actions/token'
import {createUser} from 'actions/user'
import fetch, {API_READ, API_UPDATE, API_CREATE, API_DELETE} from 'services/api';

import LoginForm from 'components/LoginForm';
import RegisterUserForm from 'components/RegisterUserForm';

export const selector = createSelector(
    state => state.token,
    state => state.entities.users,
    (token, users) => {
        const user = token ? users[token.userId] : {};
        return {
            user,
            token
        }
    }
);

@reduxForm({
    form: 'page2',
    fields: ['customerType']
}, selector, {
    deleteToken,
    createToken,
    createUser
})
export default class Page2 extends Component {
    save (data) {

    }

    render () {
        const {
            fields: {customerType},
            handleSubmit,
            nextPage,
            prevPage
        } = this.props;

        const userBlock =
            [<div className="row">
                <div className="col-sm-4">
                    <label>
                        You are logged as
                    </label>
                </div>
                <div className="col-sm-8">
                    {this.props.user.username}
                </div>
            </div>,
            <div className="row">
                <div className="col-sm-offset-4">
                    <button className="btn btn-primary" onClick={this.props.deleteToken}>Logout</button>
                    <button className="btn btn-primary" onClick={nextPage}> Next</button>
                </div>
            </div>];


        return (<div>
            {(!this.props.token) && <form className="form-horizontal" onSubmit={handleSubmit}>
                <div className={classnames("form-group",{"has-error":customerType.error})}>
                    <label className="col-sm-3 control-label">Type</label>
                    <div className="col-sm-9">
                        <div className="radio">
                            <label>
                                <input type="radio" {...customerType} value="0" checked={customerType.value === "0"}/>
                                I'm new customer
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio" {...customerType} value="1" checked={customerType.value === "1"}/>
                                Sign in
                            </label>
                        </div>
                    </div>
                </div>
            </form>}
            {(customerType.value == 0 && !this.props.token) &&
            <RegisterUserForm prevPage={prevPage} onSubmit={this.props.createUser}/>}
            {(customerType.value == 1 && !this.props.token) && <LoginForm prevPage={prevPage}
                                                                          onSubmit={data=>this.props.createToken(data.username, data.password)}></LoginForm>}
            {this.props.token && userBlock}
        </div>);
    }
}