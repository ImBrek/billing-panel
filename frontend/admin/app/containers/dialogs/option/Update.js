import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { Modal,Input} from 'react-bootstrap'
import  classnames  from 'classnames'

import {hideDialog} from 'actions/dialogs'
import {createService} from 'actions/services'
import {getServicesTree} from 'actions/categories'

class Create extends Component {
    constructor(props) {
        super(props)
        this.handleFinishClick = this.handleFinishClick.bind(this);
    }

    handleFinishClick() {
        this.props.createService({
            title: this.refs.title.value,
            cost: this.refs.cost.value,
            category: 1
        }).then(()=> {
            this.props.getServicesTree()
            this.props.hideDialog()
        })
    }

    render() {
        const spinner = this.props.dialog.isFetching ? <i className="fa fa-spin fa-spinner"></i> : '';

        return (
            <Modal show={true} onHide={this.props.hideDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>{spinner} Create/Update service</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Title</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" ref="title"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Cost</label>
                            <div className="col-sm-9">
                                <input type="number" step="any" ref="cost" className="form-control"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label">Select type</label>
                            <div className="col-sm-9">
                                <div className="radio">
                                    <label>
                                        <input type="radio" value="input" name="type"/>
                                            Input
                                    </label>
                                </div>
                                <div class="radio">
                                    <label>
                                        <input type="radio" value="select" name="type"/>
                                            Select
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">Options</label>
                            <div className="col-sm-4"><input type="text" class="form-control"/></div>
                            <div className="col-sm-3"><input type="text" class="form-control"/></div>
                            <div className="col-sm-1">
                                <button className="btn btn-default fa fa-plus"></button>
                            </div>
                        </div>
                        <div class="form-group">
                            <div className="col-sm-offset-3 col-sm-4"><input type="text" className="form-control"/></div>
                            <div className="col-sm-3"><input type="text" className="form-control"/></div>
                            <div className="col-sm-1">
                                <button className="btn btn-default fa fa-minus"></button>
                            </div>
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-default" onClick={this.props.hideDialog}>Cancel</button>
                    <button className="btn btn-primary" onClick={this.handleFinishClick}>Ok</button>
                </Modal.Footer>
            </Modal>
    )
    }
    }

    export default connect((state)=> {
        return {dialog: state.dialog}
    }, {
        hideDialog,
        createService,
        getServicesTree
    })(Create)

