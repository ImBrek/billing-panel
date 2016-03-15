import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect';
import {map} from 'lodash/collection'
import classNames from 'classnames'

import {getTree} from 'actions/pages/orders'
import {pageActivate} from 'actions/pages/index'
import {selectEntity} from 'actions/entities'

export const selector = createSelector(
    state => state.pages.orders,
    state => state.entities.orders,
    state => state.entities.orderedServices,
    state => state.entities.stServices,
    state => state.entities.stOptions,
    state => state.entities.clients,
    (page, orders, ordServices, services, options, clients) => {
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

        return {
            page,
            orders: map(page.orders, (id)=> {
                const {service} = orders[id].orderedServices.reduce((result, orderedServiceId)=> {
                    const service = services[ordServices[orderedServiceId].serviceId];
                    if (service && service.categoryId) {
                        result.service = service;
                    }
                    return result;
                }, {});
                return Object.assign({}, orders[id], {
                    service,
                    client: clients[orders[id].clientId]
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
    pageActivate: ()=>pageActivate('orders')
})
export default class OrdersPage extends Component {
    constructor (props) {
        super(props)
    }

    componentWillMount () {
        this.props.pageActivate();
    }

    render () {
        return (
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
                        <tr>
                            <th>Order id</th>
                            <th>Client</th>
                            <th>Service</th>
                            <th>Order is paid</th>
                            <th>Created date</th>
                            <th>Ticket</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.orders.map((order)=> {
                            return <tr
                                key={order.id}
                                className={classNames({info:order.id == this.props.page.selectedEntity.id})}
                                onClick={()=>{this.props.selectEntity(order)}}
                            >
                                <td >{order.id}</td>
                                <td>{order.client.title}</td>
                                <td>{order.service.title}</td>
                                <td>{order.isPaid?'yes':'no'}</td>
                                <td>{order.createdAt}</td>
                                <td></td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
                <div className="sidebar">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Service</th>
                            <th>Cost</th>
                            <th>Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.sidebar.services.map((row)=> {
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

        )
    }
}
