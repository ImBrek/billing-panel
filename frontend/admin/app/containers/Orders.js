import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect';
import {map} from 'lodash/collection'
import NavBar from 'containers/NavBar'

import {readCategory} from 'actions/category'
import {
    categoryUpdateShow,
    categoryDeleteShow,
} from 'actions/dialogs/category'
import {pageActivate} from 'actions/pages/index';

import OrderForm from './order/OrderForm'

class Dashboard extends Component {
    constructor (props) {
        super(props)
        this.test = this.test.bind(this);
    }

    componentWillMount () {
        this.props.pageActivate();
    }

    test () {
        var result = this.props.categoryDeleteShow(25);
    }


    render () {
        return (
            <div>
                <NavBar />
                <OrderForm servicesTree={this.props.servicesTree} entities={this.props.entities} onSubmit={(data)=>{console.log(data);}}/>
            </div>
        )
    }
}

export const selector = createSelector(
    state => state.pages.orders,
    state => state.entities.stCategories,
    state => state.entities.stServices,
    state => state.entities.stOptions,
    (page, categories, services, options) => {
        return {
            page,
            //Get servicesTree from entities
            servicesTree: map(page.categories, (categoryId)=> {
                return Object.assign({}, categories[categoryId], {
                    services: categories[categoryId].services.map(id=> {
                        return Object.assign({}, services[id], {
                            descendants: services[id].descendants.map(id=> {
                                return Object.assign({}, services[id], {
                                    options: services[id].options.map(id=>options[id])
                                })
                            })
                        })
                    })
                });
            }),
            entities: {
                categories,
                services,
                options
            }
        }
    }
);

export default connect(selector, {
    pageActivate: ()=>pageActivate('orders'),
    readCategory,
    categoryDeleteShow
})(Dashboard)