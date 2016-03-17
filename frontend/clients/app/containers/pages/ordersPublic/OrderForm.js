import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import  classnames  from 'classnames'
import {createSelector} from 'reselect';

import Page1 from 'components/ChooseServicesForm';
import Page2 from './Page2';
import Page3 from './Page3';
import {prevPage, nextPage, setPage} from 'actions/pages/orders';
import {createOrder} from 'actions/order';

export const selector = createSelector(
    state => state.pages.ordersPublic.currentPage,
    state => state.form.orderService,
    (currentPage, page1) => {
        return {
            currentPage
        }
    }
);

@connect(selector, {
    prevPage,
    nextPage,
    setPage,
    createOrder
})
export default class OrderForm extends Component {
    static propTypes = {};

    constructor (props) {
        super(props);
        this.save = this.save.bind(this);
    }

    save (data) {
        const services = data.descendants;
        services.push({
            serviceId: data.serviceId
        })
        this.props.createOrder({
            orderedServices: services,
            paymentType: data.paymentType
        })
    }
    setPage(page){
        this.props.setPage(page);
    }

    render () {
        const {currentPage} = this.props;
        return (
            <div className="col-sm-5">
                <ul className="nav nav-pills">
                    <li className={classnames({active:currentPage ===0})}>
                        <a href="#" onClick={()=>{this.setPage(0)}}><h4>Select services</h4></a>
                    </li>
                    <li className={classnames({active:currentPage ===1,disabled:currentPage<1})}>
                        <a href="#" onClick={()=>{this.setPage(1)}}><h4>Register/Log in</h4></a>
                    </li>
                    <li className={classnames({active:currentPage ===2,disabled:currentPage<2})}>
                        <a href="#" onClick={()=>{this.setPage(2)}}><h4>Payment</h4></a>
                    </li>
                </ul>
                <hr/>
                <div>
                    {currentPage === 0 && <Page1 onSubmit={this.props.nextPage} entities={this.props.entities}
                                                 servicesTree={this.props.servicesTree}/>}
                    {currentPage === 1 && <Page2 nextPage={this.props.nextPage}/>}
                    {currentPage === 2 && <Page3 onSubmit={this.save}/>}
                </div>
            </div>
        );
    }
}