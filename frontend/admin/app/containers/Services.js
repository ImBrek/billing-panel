import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import { map } from 'lodash/collection'
import classNames from 'classnames'

import NavBar from 'containers/NavBar'
import {getServicesTree} from 'actions/categories'
import {serviceCreateShow} from 'actions/dialogs'
import ServicesTree from 'components/ServicesTree'

class Services extends Component {
    constructor(props) {
        super(props);
        this.refreshServicesTree = this.refreshServicesTree.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        //this.render = this.render.bind(this);
    }

    refreshServicesTree() {
        this.props.getServicesTree()
    }

    componentWillMount() {
        this.refreshServicesTree();
    }

    handleButtonClick(e) {
        this.props.serviceCreateShow(1)
    }

    render() {
        const buttonStatus = classNames('fa', 'fa-refresh', {
            'fa-spin': this.props.page.servicesTree.isFetching
        })
        return (
            <div>
                <NavBar />
                <div className="services-page">
                    <div className="control-panel">
                        <button className="fa fa-plus fa-2x" onClick={this.handleButtonClick}>
                        </button>
                        <button className="fa fa-plus fa-2x">
                        </button>
                        <button className="fa fa-plus fa-2x">
                        </button>
                        <button className="fa fa-plus fa-2x">
                        </button>
                    </div>
                    <div className="content">
                        <button className="btn btn-primary pull-right" onClick={this.refreshServicesTree}><i
                            className={buttonStatus}></i></button>
                        <ServicesTree tree={this.props.servicesTree}/>
                    </div>
                </div>

            </div>
        )
    }
}


export const selector = createSelector(
    state => state.pages.services,
    state => state.entities.stCategories,
    state => state.entities.stServices,
    state => state.entities.stOptions,
    state => state.entities.stValues,
    (page, categories, services, options, values) => {
        return {
            page,
            //Get servicesTree from entities
            servicesTree: map(categories, (category)=> {
                return Object.assign({}, category, {
                    services: category.services.map(id=> {
                        return Object.assign({}, services[id], {
                            options: services[id].options.map(id=> {
                                return Object.assign({}, options[id], {
                                    values: options[id].values.map(id=>values[id])
                                })
                            })
                        })
                    })
                });

                return category
            })
        }
    }
);

export default connect(selector, {
    getServicesTree,
    serviceCreateShow
})(Services)