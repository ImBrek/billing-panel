import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import { map } from 'lodash/collection'
import classNames from 'classnames'

import NavBar from 'containers/NavBar'
import {getTree} from 'actions/pages/services'
import {selectEntity} from 'actions/entities'
import {
    categoryUpdateShow,
    categoryCreateShow,
    categoryDeleteShow,
} from 'actions/dialogs/category'

import {
    serviceUpdateShow,
    serviceCreateShow,
    serviceDeleteShow,
} from 'actions/dialogs/service'

import {
    addtServiceUpdateShow,
    addtServiceCreateShow,
    addtServiceDeleteShow,
} from 'actions/dialogs/addtService'

import {pageActivate} from 'actions/pages/index'
//import ServicesTree from 'components/ServicesTree'

class Services extends Component {
    constructor(props) {
        super(props);
        this.refreshServicesTree = this.refreshServicesTree.bind(this);
        //this.render = this.render.bind(this);
    }

    refreshServicesTree() {
        this.props.getTree()
    }

    componentWillMount() {
        this.props.pageActivate();
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="services-page">
                    <div className="control-panel">
                        <button className="show"
                            title="Create new category"
                            onClick={this.props.categoryCreateShow}>
                            <i className="fa fa-plus fa-2x"></i>
                        </button>
                        <button
                            title="Edit selected category"
                            className={classNames({show:this.props.page.selectedEntity._type == 'stCategories'})}
                            onClick={()=>{this.props.categoryUpdateShow(this.props.page.selectedEntity.id)}}>
                            <i className="fa fa-edit fa-2x"></i>
                        </button>
                        <button
                            title="Delete selected category"
                            className={classNames({show:this.props.page.selectedEntity._type == 'stCategories'})}
                            onClick={()=>{this.props.categoryDeleteShow(this.props.page.selectedEntity.id)}}>
                            <i className="fa fa-trash fa-2x"></i>
                        </button>

                        <button
                            title="Create new service"
                            className={classNames({show:this.props.page.selectedEntity._type == 'stCategories'})}
                            onClick={()=>{this.props.serviceCreateShow(this.props.page.selectedEntity.id)}}>
                            <i className="fa fa-plus fa-2x"></i>
                        </button>
                        <button
                            title="Edit selected service"
                            className={classNames({show:this.props.page.selectedEntity._type == 'stServices' && this.props.page.selectedEntity.categoryId})}
                            onClick={()=>{this.props.serviceUpdateShow(this.props.page.selectedEntity.id)}}>
                            <i className="fa fa-edit fa-2x"></i>
                        </button>
                        <button
                            title="Delete selected service"
                            className={classNames({show:this.props.page.selectedEntity._type == 'stServices' && this.props.page.selectedEntity.categoryId})}
                            onClick={()=>{this.props.serviceDeleteShow(this.props.page.selectedEntity.id)}}>
                            <i className="fa fa-trash fa-2x"></i>
                        </button>

                        <button
                            title="Create new additional service"
                            className={classNames({show:this.props.page.selectedEntity._type == 'stServices' && this.props.page.selectedEntity.categoryId})}
                            onClick={()=>{this.props.addtServiceCreateShow(this.props.page.selectedEntity.id)}}>
                            <i className="fa fa-plus fa-2x"></i>
                        </button>
                        <button
                            title="Edit selected additional service"
                            className={classNames({show:this.props.page.selectedEntity._type == 'stServices' && this.props.page.selectedEntity.parentId})}
                            onClick={()=>{this.props.addtServiceUpdateShow(this.props.page.selectedEntity.id)}}>
                            <i className="fa fa-edit fa-2x"></i>
                        </button>
                        <button
                            title="Delete selected additional service"
                            className={classNames({show:this.props.page.selectedEntity._type == 'stServices' && this.props.page.selectedEntity.parentId})}
                            onClick={()=>{this.props.serviceDeleteShow(this.props.page.selectedEntity.id)}}>
                            <i className="fa fa-trash fa-2x"></i>
                        </button>

                        <button
                            title="Refresh"
                            className="show"
                            onClick={this.refreshServicesTree}>
                            <i className={classNames('fa','fa-refresh','fa-2x',{'fa-spin': this.props.page.isFetching})}></i>
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
            })
        }
    }
);

export default connect(selector, {
    getTree,
    serviceCreateShow,
    serviceUpdateShow,
    serviceDeleteShow,

    categoryCreateShow,
    categoryUpdateShow,
    categoryDeleteShow,

    addtServiceUpdateShow,
    addtServiceCreateShow,
    addtServiceDeleteShow,

    pageActivate:()=>pageActivate('services'),
    selectEntity
})(Services)

class ServicesTree extends Component {
    constructor(props) {
        super(props)
    }

    renderCategory(category) {
        return <tr
            className={classNames("level-0",{info:this.props.selectedEntity.id == category.id && this.props.selectedEntity._type=='stCategories'})}
            key={'c'+category.id}
            onClick={()=>{this.props.selectEntity(category,'stCategories')}}>
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
            className={classNames("level-1",{info:this.props.selectedEntity.id == service.id && this.props.selectedEntity._type=='stServices'})}
            key={'s'+service.id}
            onClick={()=>{this.props.selectEntity(service,'stServices')}}>
            <td>
                <i className="fa fa-minus expand-control"></i>
                <span className="intend"> {service.title}</span>
            </td>
            <td>{service.cost}</td>
            <td>{service.description}</td>
        </tr>
    }

    renderDescendantService(option) {
        return <tr
            className={classNames("level-2",{info:this.props.selectedEntity.id == option.id && this.props.selectedEntity._type=='stServices'})}
            key={'s'+option.id}
            onClick={()=>{this.props.selectEntity(option,'stServices')}}>
            <td>
                <i className="fa fa-minus expand-control"></i>
                <span className="intend"> {option.title}</span>
            </td>
            <td>{option.cost}</td>
            <td>{option.description}</td>
        </tr>
    }

    renderOption(value) {
        return <tr className="level-3" key={'v'+value.id}>
            <td>
                <i className="fa fa-minus expand-control"></i>
                <span className="intend">{value.title}</span>
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
                service.descendants.forEach((option)=> {
                    table.push(this.renderDescendantService(option))
                    option.options.forEach((value)=> {
                        if (option.type === 1) {
                            table.push(this.renderOption(value))
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