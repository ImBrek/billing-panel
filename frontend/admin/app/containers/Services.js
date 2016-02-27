import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import { map } from 'lodash/collection'
import classNames from 'classnames'

import NavBar from 'containers/NavBar'
import {getServicesTree} from 'actions/categories'
import {serviceUpdateShow,serviceCreateShow} from 'actions/dialogs'
import {pageRegister} from 'actions/pages'
//import ServicesTree from 'components/ServicesTree'

class Services extends Component {
    constructor(props) {
        super(props);
        this.refreshServicesTree = this.refreshServicesTree.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleButtonClick1 = this.handleButtonClick1.bind(this);
        //this.render = this.render.bind(this);
    }

    refreshServicesTree() {
        this.props.getServicesTree()
    }

    componentWillMount() {
        this.props.pageRegister();
        this.refreshServicesTree();
    }

    handleButtonClick(e) {
        this.props.serviceUpdateShow(1)
    }
    handleButtonClick1(e) {
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
                        <button className="fa fa-plus fa-2x" onClick={this.handleButtonClick1}>
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
    state => state.page,
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
    serviceCreateShow,
    serviceUpdateShow,
    pageRegister
})(Services)

class ServicesTree extends Component {
    constructor(props) {
        super(props)
    }

    renderCategory(category) {
        return <tr className="level-0" key={'c'+category.id}>
            <td>
                <i className="fa fa-minus expand-control"></i>
                <span className="intend"> {category.title}</span>
            </td>
            <td>{category.cost}</td>
            <td>{category.description}</td>
        </tr>
    }
    renderService(service) {
        return <tr className="level-1" key={'s'+service.id}>
            <td>
                <i className="fa fa-minus expand-control"></i>
                <span className="intend"> {service.title}</span>
            </td>
            <td>{service.cost}</td>
            <td>{service.description}</td>
        </tr>
    }
    renderOption(option) {
        return <tr className="level-2" key={'o'+option.id}>
            <td>
                <i className="fa fa-minus expand-control"></i>
                <span className="intend"> {option.title}</span>
            </td>
            <td>{option.cost}</td>
            <td>{option.description}</td>
        </tr>
    }
    renderValue(value) {
        return <tr className="level-3" key={'v'+value.id}>
            <td>
                <i className="fa fa-minus expand-control"></i>
                <span className="intend"> {value.title}</span>
            </td>
            <td>{value.cost}</td>
            <td>{value.description}</td>
        </tr>
    }

    render() {
        let table = [];
        this.props.tree.forEach((category)=> {
            table.push(this.renderCategory(category))
            category.services.forEach((service)=>{
                table.push(this.renderService(service))
                service.options.forEach((option)=>{
                    table.push(this.renderOption(option))
                    option.values.forEach((value)=>{
                        if (option.type === 0){
                            table.push(this.renderValue(value))
                        }
                    })
                })
            })
        })
        return (
            <table className="table table-striped table-tree table-bordered">
                <thead>
                <tr>
                    <th><i className="fa fa-minus-square expand-control"></i> Name</th>
                    <th>Cost</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                    {table}
                </tbody>
            </table>
        )
    }
}