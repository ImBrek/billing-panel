import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import  classnames  from 'classnames'
import {createSelector} from 'reselect';
import {createToken, deleteToken} from 'actions/token'
import {createUser} from 'actions/user'
import fetch, {API_READ, API_UPDATE, API_CREATE, API_DELETE} from 'services/api';

import SignInForm from 'components/SignInForm';
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
    fields: ['customerType'],
    destroyOnUnmount: false
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
        const userBlock = <div className="row">
            <div className="col-sm-9 col-sm-offset-2">
                You are logged as UserId:{this.props.token && this.props.token.userId}
                <button className="btn btn-primary" onClick={this.props.deleteToken}>Logout</button>
                <button className="btn btn-primary" onClick={nextPage}> Next</button>
            </div>

        </div>;
        return (<div>
            {(!this.props.token) && <form className="form-horizontal" onSubmit={handleSubmit}>
                <div className={classnames("form-group",{"has-error":customerType.error})}>
                    <label className="col-sm-2 control-label"></label>
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
            {(customerType.value == 0 && !this.props.token) && <RegisterUserForm prevPage={prevPage} onSubmit={this.props.createUser}/>}
            {(customerType.value == 1 && !this.props.token) && <SignInForm prevPage={prevPage} onSubmit={data=>this.props.createToken(data.username, data.password)}></SignInForm>}
            {this.props.token && userBlock}
        </div>);
    }
}