import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import  classnames  from 'classnames'

export const fields = ['paymentType'];

const validate = values => {
    const errors = {};
    // if (!values.favoriteColor) {
    //     errors.favoriteColor = 'Required';
    // }
    return errors;
};

class Page3 extends Component {
    static propTypes = {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        previousPage: PropTypes.func.isRequired,
        submitting: PropTypes.bool.isRequired
    };

    render() {
        const {
            fields: {paymentType},
            handleSubmit,
            previousPage,
            submitting
        } = this.props;

        return (<form onSubmit={handleSubmit} className="form-horizontal">
                <div className={classnames("form-group",{"has-error":paymentType.error})}>
                    <label className="col-sm-2 control-label"></label>
                    <div className="col-sm-9">
                        <div class="radio">
                            <label>
                                <input type="radio" {...paymentType} value="0" checked={paymentType.value === "0"}/> WMZ
                            </label>
                        </div>
                        <div class="radio">
                            <label>
                                <input type="radio" {...paymentType} value="1" checked={paymentType.value === "1"}/> BitCoin
                            </label>
                        </div>
                        <div class="radio">
                            <label>
                                <input type="radio" {...paymentType} value="2" checked={paymentType.value === "2"}/> PerfectMoney
                            </label>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-9">
                        <button type="button" onClick={previousPage} className="btn btn-primary">
                            <i className="fa fa-angle-left"></i> Previous
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Finish
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'wizard',              // <------ same form name
    fields,                      // <------ all fields on last wizard page
    destroyOnUnmount: false,     // <------ preserve form data
    validate                     // <------ only validates the fields on this page
})(Page3);