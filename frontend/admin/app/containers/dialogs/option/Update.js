import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { Modal} from 'react-bootstrap'
import  classnames  from 'classnames'
import {reduxForm} from 'redux-form';

import {hideDialog} from 'actions/dialogs'
import {createOption} from 'actions/options'
import {updateOption} from 'actions/options'
import {getServicesTree} from 'actions/categories'

class Update extends Component {
    constructor(props) {
        super(props)
        this.save = this.save.bind(this);
    }

    save(data) {
        console.log(data);
        if (this.props.dialog.id){
            this.props.updateOption(this.props.dialog.id,data).then(() =>{
                this.props.hideDialog();
            })
        } else {
            if (data.type == 0){
                delete data.values
            }
            this.props.createOption({...data, service: this.props.dialog.serviceId}).then(()=> {
                this.props.getServicesTree();
                this.props.hideDialog();
            })

        }
    }

    render() {
        const {fields: {title,cost,values,type},handleSubmit,submitting,invalid} = this.props;
        const spinner = this.props.dialog.isFetching ? <i className="fa fa-spin fa-spinner"></i> : '';

        let valuesBlock = '';

        if (type.value == 1) valuesBlock = values.map((val, index) =>
            <div className="form-group" key={index}>
                <label className="col-sm-2 control-label">Value {index + 1}</label>
                <div className="col-sm-4"><input type="text" className="form-control" {...val.value}/></div>
                <div className="col-sm-3"><input type="number" step="any" min="0"
                                                 className="form-control" {...val.cost}/></div>
                <div className="col-sm-3">
                    <button type="button" className="btn btn-default fa fa-plus"
                            onClick={()=>values.addField()}></button>
                    <button type="button" className="btn btn-default fa fa-trash"
                            onClick={()=>values.removeField(3)}></button>
                </div>
            </div>
        )

        return (
            <Modal show={true} onHide={this.props.hideDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>{spinner} Create/Update option</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Title</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" {...title}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Cost</label>
                            <div className="col-sm-9">
                                <input type="number" step="any" className="form-control" {...cost}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Option type</label>
                            <div className="col-sm-9">
                                <div className="radio">
                                    <label>
                                        <input type="radio" value="input" name="type" {...type} value="0"
                                               checked={type.value === "0"}/> Input
                                    </label>
                                </div>
                                <div className="radio">
                                    <label>
                                        <input type="radio" value="select" name="type" {...type} value="1"
                                               checked={type.value === "1"}/> Select
                                    </label>
                                </div>
                            </div>
                        </div>

                        {valuesBlock}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-default" onClick={this.props.hideDialog}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleSubmit(this.save)}>Ok</button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default reduxForm({
        form: 'updateOption',
        fields: [
            'title',
            'cost',
            'type',
            'values[].id',
            'values[].value',
            'values[].cost'],
    },
    (state)=> {
        let initialValues;
        if (state.dialog.id) {
            initialValues = Object.assign({},
                state.entities.stOptions[state.dialog.id],
                {
                    values: state.entities.stOptions[state.dialog.id].values.map(id=>state.entities.stValues[id])
                }
            )
        } else {
            initialValues = {
                values: [
                    {title: '', cost: 0}
                ]
            };
        }
        return {
            dialog: state.dialog,
            initialValues
        }
    }, {
        getServicesTree,
        createOption,
        updateOption,
        hideDialog
    })(Update)

