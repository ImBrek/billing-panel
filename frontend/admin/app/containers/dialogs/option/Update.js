import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { Modal} from 'react-bootstrap'
import  classnames  from 'classnames'
import {reduxForm} from 'redux-form';
import {change} from 'redux-form';
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
        if (this.props.dialog.id) {
            this.props.updateOption(this.props.dialog.id, data).then((data) => {
                console.log('Тут что то',data);
                //this.props.hideDialog();
            })
        } else {
            if (data.type == 0) {
                delete data.values
            }
            this.props.createOption({...data, service: this.props.dialog.serviceId}).then((data,data1)=> {
                console.log('Тут что то',data,data1);
                //this.props.getServicesTree();
                //this.props.hideDialog();
            })

        }
    }

    render() {
        const {fields: {title,cost,values,type},handleSubmit,submitting,invalid} = this.props;
        const spinner = this.props.dialog.isFetching ? <i className="fa fa-spin fa-spinner"></i> : '';

        let valuesBlock = '';
        if (type.value == 1) valuesBlock = values.map((val, index) =>
            <div className={classnames("form-group",{"has-error":val.cost.error || val.title.error})} key={index}>
                <label className="col-sm-2 control-label">Value {index + 1}</label>
                <div className="col-sm-4"><input type="text" className="form-control" {...val.title}/></div>
                <div className="col-sm-3"><input type="number" step="any" min="0"
                                                 className="form-control" {...val.cost}/></div>
                <div className="col-sm-3 btn-toolbar">
                    <button type="button"
                            className={classnames("btn btn-default",{hide:values.length==1})}
                            onClick={()=>values.removeField(index)}><i className="fa fa-trash"></i></button>
                    <button type="button"
                            className={classnames("btn btn-default",{hide:index!=values.length-1})}
                            onClick={()=>values.addField()}><i className="fa fa-plus"></i></button>
                    <button type="button"
                            className={classnames("btn btn-default")}
                            onClick={()=>this.props.updateField(val._deleted.name,!val._deleted.value)}>111
                    </button>
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
                        <div className={classnames("form-group",{"has-error":title.error})}>
                            <label className="col-sm-2 control-label">Title</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" {...title}/>
                            </div>
                        </div>
                        <div className={classnames("form-group",{"has-error":cost.error})}>
                            <label className="col-sm-2 control-label">Cost</label>
                            <div className="col-sm-9">
                                <input type="number" step="any" min="0" className="form-control" {...cost}/>
                            </div>
                        </div>
                        <div className={classnames("form-group",{"has-error":type.error})}>
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

function validate(data) {
    const errors = {};
    if (!data.title) errors.title = 'Required';
    if (!data.type) errors.type = 'Required';
    errors.values = [];
    for (let i = 0,len = data.values.length; i < len; i++) {
        errors.values.push({})
        if (!data.values[i].title) errors.values[i].title = 'Required'
        if (data.values[i].cost === undefined) errors.values[i].cost = 'Required'
    }
    return errors;
}

export default reduxForm({
        form: 'updateOption',
        fields: [
            'title',
            'cost',
            'type',
            'values[].id',
            'values[].title',
            'values[]._deleted',
            'values[].cost'],
        validate
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
        hideDialog,
        updateField: (field, value)=> {
            return change('updateOption', field, value)
        }
    })(Update)

