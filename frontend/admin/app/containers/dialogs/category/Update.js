import React, { Component, PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import { createSelector } from 'reselect'
import { Modal} from 'react-bootstrap'
import  classnames  from 'classnames'

import {hideDialog} from 'actions/dialogs'
import {createCategory,updateCategory,readCategory} from 'actions/category'

class Update extends Component {
    static propTypes = {
        hideDialog: PropTypes.func.isRequired,
        createCategory: PropTypes.func.isRequired,
        updateCategory: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props)
        this.save = this.save.bind(this);
        this.render = this.render.bind(this);
    }

    save(data) {
        if (this.props.dialog.id){
            this.props.updateCategory(this.props.dialog.id,{...data});
        } else {
            this.props.createCategory({...data});
        }
    }

    render() {
        const {fields: {title,description},handleSubmit,submitting,invalid} = this.props;
        const spinner = submitting ? <i className="fa fa-spin fa-spinner"></i> : '';
        return (
            <Modal show={true} onHide={this.props.hideDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>{spinner} Create/Update category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal">
                        <div className={classnames("form-group",{"has-error":title.error})}>
                            <label className="col-sm-2 control-label">Title</label>
                            <div className="col-sm-9">
                                <input type="text" maxLength="255" className="form-control" {...title}/>
                            </div>
                        </div>
                        <div className={classnames("form-group",{"has-error":description.error})}>
                            <label className="col-sm-2 control-label">Description</label>
                            <div className="col-sm-9">
                                <input type="text" maxLength="255" className="form-control" {...description}/>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-default" onClick={this.props.hideDialog}>Cancel</button>
                    <button className="btn btn-primary" disabled={invalid || submitting}
                            onClick={handleSubmit(this.save)}>Ok
                    </button>
                </Modal.Footer>
            </Modal>
        )
    }
}

function validate(values) {
    const errors = {};
    if (!values.title) errors.title = 'Required';
    return errors;
}

export default reduxForm({
        form: 'updateCategory',
        fields: ['title', 'description'],
        validate
    },
    (state)=> {
        return {
            dialog: state.dialog,
            initialValues:state.entities.stCategories[state.dialog.id]
        }
    }, {
        createCategory,
        updateCategory,
        hideDialog
    })(Update)