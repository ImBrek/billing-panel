import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
export const fields = ['email', 'jabber', 'name', 'customerType', 'username', 'password'];
import  classnames  from 'classnames'

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(values.email)){
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
    if (!values.customerType) {
        errors.customerType = 'Required';
    }
    return errors;
};

class Page2 extends Component {
    static propTypes = {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        previousPage: PropTypes.func.isRequired
    };

    render () {
        const {
            fields: {email, jabber, name, customerType, username, password},
            handleSubmit,
            previousPage
        } = this.props;

        const newCustomerBlock = <div>
            <div className={classnames("form-group",{"has-error":name.error})}>
                <label className="col-sm-2 control-label">Your name</label>
                <div className="col-sm-9">
                    <input type="text" maxLength="255" className="form-control" {...name}/>
                </div>
            </div>
            <div className={classnames("form-group",{"has-error":email.error})}>
                <label className="col-sm-2 control-label">Email</label>
                <div className="col-sm-9">
                    <input type="text" maxLength="255" className="form-control" {...email}/>
                </div>
            </div>
            <div className={classnames("form-group",{"has-error":jabber.error})}>
                <label className="col-sm-2 control-label">Jabber</label>
                <div className="col-sm-9">
                    <input type="text" maxLength="255" className="form-control" {...jabber}/>
                </div>
            </div>

            <div className={classnames("form-group",{"has-error":username.error})}>
                <label className="col-sm-2 control-label">Username</label>
                <div className="col-sm-9">
                    <input type="text" maxLength="255" className="form-control" {...username}/>
                </div>
            </div>
            <div className={classnames("form-group",{"has-error":password.error})}>
                <label className="col-sm-2 control-label">Password</label>
                <div className="col-sm-9">
                    <input type="password" maxLength="255" className="form-control" {...password}/>
                </div>
            </div>
        </div>;

        const signInBlock = <div>
            <div className={classnames("form-group",{"has-error":username.error})}>
                <label className="col-sm-2 control-label">Username</label>
                <div className="col-sm-9">
                    <input type="text" maxLength="255" className="form-control" {...username}/>
                </div>
            </div>
            <div className={classnames("form-group",{"has-error":password.error})}>
                <label className="col-sm-2 control-label">Password</label>
                <div className="col-sm-9">
                    <input type="password" maxLength="255" className="form-control" {...password}/>
                </div>
            </div>
        </div>;

        return (<form onSubmit={handleSubmit} className="form-horizontal">
                <div className={classnames("form-group",{"has-error":customerType.error})}>
                    <label className="col-sm-2 control-label"></label>
                    <div className="col-sm-9">
                        <div class="radio">
                            <label>
                                <input type="radio" {...customerType} value="0" checked={customerType.value === "0"}/> I'm new customer
                            </label>
                        </div>
                        <div class="radio">
                            <label>
                                <input type="radio" {...customerType} value="1" checked={customerType.value === "1"}/> Sign in
                            </label>
                        </div>
                    </div>
                </div>
                {customerType.value ? (customerType.value == 0? newCustomerBlock : signInBlock):null}
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-9">
                        <button type="button" onClick={previousPage} className="btn btn-primary">
                            <i className="fa fa-angle-left"></i> Previous
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Next <i className="fa fa-angle-right"></i>
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'wizard',              // <------ same form name
    fields,                      // <------ only fields on this page
    destroyOnUnmount: false,     // <------ preserve form data
    validate                     // <------ only validates the fields on this page
})(Page2);