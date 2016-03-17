import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import  classnames  from 'classnames'

export const fields = [
    'categoryId',
    'serviceId',
    'descendants[].id',
    'descendants[].cost',
    'descendants[].optionId',
    'descendants[].serviceId',
    'descendants[].value',
    'descendants[]._type',
    'paymentType'
];

const validate = values => {
    const errors = {};
    if (!values.paymentType){
        errors.paymentType = 'Required';
    }
    return errors;
};

@reduxForm({
    form: 'orderService',
    fields,
    destroyOnUnmount: false,
    validate
})
export default class Page3 extends Component {
    static propTypes = {
    };

    render() {
        const {
            fields: {paymentType},
            handleSubmit,
            prevPage,
            submitting,
            invalid
        } = this.props;

        return (<form onSubmit={handleSubmit} className="form-horizontal">
                <div className={classnames("form-group",{"has-error":paymentType.error})}>
                    <label className="col-sm-3 control-label">Payment type</label>
                    <div className="col-sm-9">
                        <div className="radio">
                            <label>
                                <input type="radio" {...paymentType} value="0" checked={paymentType.value === "0"}/> WMZ
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio" {...paymentType} value="1" checked={paymentType.value === "1"}/> BitCoin
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio" {...paymentType} value="2" checked={paymentType.value === "2"}/> PerfectMoney
                            </label>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-sm-offset-3 col-sm-9">
                        <button type="submit" className="btn btn-primary" disabled={submitting || invalid}>
                            {submitting ? <i className="fa fa-spin fa-spinner"></i> : null} Finish
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}