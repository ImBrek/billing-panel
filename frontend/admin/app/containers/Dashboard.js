import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect';
import { map } from 'lodash/collection'

import NavBar from 'containers/NavBar'
import {getOrder} from 'actions/order'
import {pageActivate} from 'actions/pages/index'

export const selector = createSelector(
    state => state.pages.dashboard,
    state => state.entities.orders,
    (page, orders) => {
        return {
            page,
            orders: map(page.orders, (id)=> {
                return Object.assign({}, orders[id]);
            })
        }
    }
);


@connect(selector,{
    getOrder,
    pageActivate:()=>pageActivate('dashboard')
})
export default class Dashboard extends Component {
    constructor (props) {
        super(props)
    }

    componentWillMount () {
        this.props.pageActivate();
        this.props.getOrder();
    }

    render () {
        console.log(this.props);
        return (
            <div>
                <NavBar />
                <button className="btn btn-primary">
                    <i className="fa fa-spinner"></i>
                </button>
                <table className="table-stripped table table-bordered">
                    <thead></thead>
                    <tbody>
                        {this.props.orders.map((order)=>{
                            return <tr key={order.id}>
                                <td >{order.id}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
