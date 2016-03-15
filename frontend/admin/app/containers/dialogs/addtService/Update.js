import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {Modal} from 'react-bootstrap'
import  classnames  from 'classnames'
import {reduxForm} from 'redux-form';
import {change} from 'redux-form';

import {hideDialog} from 'actions/dialogs'
import {createAddtService, updateAddtService} from 'actions/addtService'


class Update extends Component {
    constructor (props) {
        super(props)
        this.save = this.save.bind(this);
    }

    save (data) {
        if (this.props.dialog.id) {
            this.props.updateAddtService(this.props.dialog.id, data);
        } else {
            if (data.type == 0) {
                delete data.options
            }
            this.props.createAddtService(this.props.dialog.parentId, data);
        }
    }

    render () {
        const {fields: {title, cost, options, type}, handleSubmit, submitting, invalid} = this.props;
        const spinner = this.props.dialog.isFetching ? <i className="fa fa-spin fa-spinner"></i> : '';

        let optionsBlock = '';
        if (type.value == 1) optionsBlock = options.map((val, index) => {
                const label = val.isDeleted.value === true ? <s>Value {index + 1}</s> : <span>Value {index + 1}</span>;
                return <div className={classnames("form-group",{"has-error":val.cost.error || val.title.error})}
                            key={index}>
                    <label className="col-sm-2 control-label">
                        {label}
                    </label>
                    <div className="col-sm-4"><input type="text" className="form-control" {...val.title}/></div>
                    <div className="col-sm-3"><input type="number" step="any" min="0"
                                                     className="form-control" {...val.cost}/></div>
                    <div className="col-sm-3 btn-toolbar">
                        <button type="button"
                                className={classnames("btn btn-default",{hide:options.length==1 || val.id.value})}
                                onClick={()=>options.removeField(index)}><i className="fa fa-trash"></i></button>
                        <button type="button"
                                className={classnames("btn btn-default",{hide:!val.id.value})}
                                onClick={()=>this.props.updateField(val.isDeleted.name,!val.isDeleted.value)}>
                            <i className="fa fa-trash"></i>
                        </button>
                        <button type="button"
                                className={classnames("btn btn-default",{hide:index!=options.length-1})}
                                onClick={()=>options.addField()}><i className="fa fa-plus"></i></button>
                    </div>
                </div>
            }
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

                        {optionsBlock}
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

function validate (data) {
    const errors = {};
    if (!data.title) errors.title = 'Required';
    if (!data.type) errors.type = 'Required';
    if (data.type == 1) {
        errors.options = [];
        for (let i = 0, len = data.options.length; i < len; i++) {
            errors.options.push({})
            if (!data.options[i].title) errors.options[i].title = 'Required'
            if (data.options[i].cost === undefined) errors.options[i].cost = 'Required'
        }
    }
    return errors;
}

export default reduxForm({
        form: 'updateOption',
        fields: [
            'id',
            'title',
            'cost',
            'type',
            'options[].id',
            'options[].title',
            'options[].isDeleted',
            'options[].cost'],
        validate
    },
    (state)=> {
        let initialValues;
        if (state.dialog.id) {
            initialValues = Object.assign({},
                state.entities.stServices[state.dialog.id],
                {
                    options: state.entities.stServices[state.dialog.id].options.map(id=>state.entities.stOptions[id])
                }
            )
        } else {
            initialValues = {
                options: [
                    {title: '', cost: 0, isDeleted: false}
                ]
            };
        }
        return {
            dialog: state.dialog,
            initialValues
        }
    }, {
        createAddtService,
        updateAddtService,
        hideDialog,
        updateField: (field, value)=> {
            return change('updateOption', field, value)
        }
    })(Update)

