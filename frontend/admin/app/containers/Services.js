import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import { map } from 'lodash/collection'
import classNames from 'classnames'

import NavBar from 'containers/NavBar'
import {getServicesTree} from 'actions/categories'
import {selectEntity} from 'actions/entities'
import {serviceUpdateShow,serviceCreateShow,optionUpdateShow,optionCreateShow} from 'actions/dialogs'
import {pageActivate} from 'actions/pages'
//import ServicesTree from 'components/ServicesTree'

class Services extends Component {
    constructor(props) {
        super(props);
        this.refreshServicesTree = this.refreshServicesTree.bind(this);
        //this.render = this.render.bind(this);
    }

    refreshServicesTree() {
        this.props.getServicesTree()
    }

    componentWillMount() {
        this.props.pageActivate();
        this.refreshServicesTree();
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="services-page">
                    <div className="control-panel">
                        <button
                            title="Edit selected service"
                            className={classNames('fa','fa-edit','fa-2x',{hide:this.props.page.selectedEntity.type != 'stServices'})}
                            onClick={()=>{this.props.serviceUpdateShow(this.props.page.selectedEntity.id)}}>
                        </button>
                        <button
                            title="Create new service"
                            className={classNames('fa','fa-plus','fa-2x',{hide:(this.props.page.selectedEntity.type != 'stCategories')})}
                            onClick={()=>{this.props.serviceCreateShow(this.props.page.selectedEntity.id)}}>
                        </button>
                        <button
                            title="Edit selected option"
                            className={classNames('fa','fa-edit','fa-2x',{hide:this.props.page.selectedEntity.type != 'stOptions'})}
                            onClick={()=>{this.props.optionUpdateShow(this.props.page.selectedEntity.id)}}>
                        </button>
                        <button
                            title="Create new option"
                            className={classNames('fa','fa-plus','fa-2x',{hide:(this.props.page.selectedEntity.type != 'stServices')})}
                            onClick={()=>{this.props.optionCreateShow(this.props.page.selectedEntity.id)}}>
                        </button>
                        <button
                            title="Refresh"
                            className={classNames('fa','fa-refresh','fa-2x',{'fa-spin': this.props.page.isFetching})}
                            onClick={this.refreshServicesTree}>
                        </button>
                    </div>
                    <div className="content">
                        <ServicesTree
                            tree={this.props.servicesTree}
                            selectEntity={this.props.selectEntity}
                            selectedEntity={this.props.page.selectedEntity}
                        />
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
    serviceCreateShow,
    serviceUpdateShow,
    optionCreateShow,
    optionUpdateShow,
    pageActivate,
    selectEntity
})(Services)

class ServicesTree extends Component {
    constructor(props) {
        super(props)
    }

    renderCategory(category) {
        return <tr
            className={classNames("level-0",{info:this.props.selectedEntity.id == category.id && this.props.selectedEntity.type=='stCategories'})}
            key={'c'+category.id}
            onClick={()=>{this.props.selectEntity(category.id,'stCategories')}}>
            <td>
                <i className="fa fa-minus expand-control"></i>
                <span className="intend"> {category.title}</span>
            </td>
            <td>{category.cost}</td>
            <td>{category.description}</td>
        </tr>
    }

    renderService(service) {
        return <tr
            className={classNames("level-1",{info:this.props.selectedEntity.id == service.id && this.props.selectedEntity.type=='stServices'})}
            key={'s'+service.id}
            onClick={()=>{this.props.selectEntity(service.id,'stServices')}}>
            <td>
                <i className="fa fa-minus expand-control"></i>
                <span className="intend"> {service.title}</span>
            </td>
            <td>{service.cost}</td>
            <td>{service.description}</td>
        </tr>
    }

    renderOption(option) {
        return <tr
            className={classNames("level-2",{info:this.props.selectedEntity.id == option.id && this.props.selectedEntity.type=='stOptions'})}
            key={'o'+option.id}
            onClick={()=>{this.props.selectEntity(option.id,'stOptions')}}>
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
                <span className="intend">{value['value']}</span>
            </td>
            <td>{value.cost}</td>
            <td>{value.description}</td>
        </tr>
    }

    render() {
        let table = [];
        this.props.tree.forEach((category)=> {
            table.push(this.renderCategory(category))
            category.services.forEach((service)=> {
                table.push(this.renderService(service))
                service.options.forEach((option)=> {
                    table.push(this.renderOption(option))
                    option.values.forEach((value)=> {
                        if (option.type === 1) {
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