import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect';
import {map} from 'lodash/collection'
import classNames from 'classnames'

import NavBar from 'containers/NavBar'
import {getTree} from 'actions/pages/orders'
import {pageActivate} from 'actions/pages/index'
import {selectEntity} from 'actions/entities'

export const selector = createSelector(
    state => state.pages.dashboard,
    state => state.entities.orders,
    state => state.entities.orderedServices,
    state => state.entities.stServices,
    state => state.entities.stOptions,
    (page, orders, ordServices, services, options) => {
        let s = [];
        if (page.selectedEntity && orders[page.selectedEntity.id]) {
            s = orders[page.selectedEntity.id].orderedServices.map((id)=> {
                const service = services[ordServices[id].serviceId];
                const option = options[ordServices[id].optionId];
                return {
                    service: service || option,
                    value: ordServices[id].value,
                    id
                }
            });
        }
        console.log(s);


        return {
            page,
            orders: map(page.orders, (id)=> {
                const {service} = orders[id].orderedServices.reduce((result, orderedServiceId)=> {
                    const service = services[ordServices[orderedServiceId].serviceId];
                    return {
                        service: service && service.categoryId && service,
                    };
                }, {});
                return Object.assign({}, orders[id], {
                    service
                });
            }),
            sidebar: {
                services: s
            }
        }
    }
);


@connect(selector, {
    getTree,
    selectEntity,
    pageActivate: ()=>pageActivate('dashboard')
})
export default class Dashboard extends Component {
    constructor (props) {
        super(props)
    }

    componentWillMount () {
        this.props.pageActivate();
    }

    render () {
        return (
            <div>
                <NavBar />
                <div className="orders-page">
                    <div className="control-panel">
                        <button
                            title="Refresh"
                            className="show"
                            onClick={this.props.getTree}>
                            <i className={classNames('fa','fa-refresh','fa-2x',{'fa-spin': this.props.page.isFetching})}></i>
                        </button>
                    </div>
                    <div className="content">
                        <table className="table-stripped table table-bordered">
                            <thead>
                            <th>Order id</th>
                            <th>Client</th>
                            <th>Service</th>
                            <th>Order is paid</th>
                            <th>Created date</th>
                            <th>Ticket</th>
                            </thead>
                            <tbody>
                            {this.props.orders.map((order)=> {
                                return <tr
                                    key={order.id}
                                    className={classNames({info:order.id == this.props.page.selectedEntity.id})}
                                    onClick={()=>{this.props.selectEntity(order)}}
                                >
                                    <td >{order.id}</td>
                                    <td></td>
                                    <td >{order.service.title}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    </div>
                    <div className="sidebar">
                        <table className="table table-bordered">
                            <thead>
                            <th>Service</th>
                            <th>Cost</th>
                            <th>Value</th>
                            </thead>
                            <tbody>
                            {this.props.sidebar.services.map((row)=>{
                                return (
                                    <tr key={row.id}>
                                        <td>{row.service.title}</td>
                                        <td>{row.service.cost}</td>
                                        <td>{row.value}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
}
