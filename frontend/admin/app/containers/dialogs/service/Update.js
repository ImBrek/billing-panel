import React, { Component, PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import { createSelector } from 'reselect'
import { Modal,Input} from 'react-bootstrap'
import  classnames  from 'classnames'

import {hideDialog} from 'actions/dialogs'
import {createService,updateService} from 'actions/services'
import {getServicesTree} from 'actions/categories'

class Update extends Component {
    static propTypes = {
        getServicesTree: PropTypes.func.isRequired,
        hideDialog: PropTypes.func.isRequired,
        createService: PropTypes.func.isRequired,
        updateService: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props)
        this.save = this.save.bind(this);
        this.render = this.render.bind(this);
    }

    save(data) {
        if (this.props.dialog.id){
            this.props.updateService(this.props.dialog.id,data).then(() =>{
                this.props.hideDialog();
            })
        } else {
            this.props.createService({...data, category: 1}).then(()=> {
                this.props.getServicesTree();
                this.props.hideDialog();
            })

        }
    }

    render() {
        const {fields: {title,cost},handleSubmit,submitting,invalid} = this.props;
        const spinner = submitting ? <i className="fa fa-spin fa-spinner"></i> : '';
        return (
            <Modal show={true} onHide={this.props.hideDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>{spinner} Create/Update service</Modal.Title>
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
    if (!values.cost) errors.cost = 'Required';
    return errors;
}

export default reduxForm({
        form: 'updateService',
        fields: ['title', 'cost'],
        validate
    },
    (state)=> {
        return {
            dialog: state.dialog,
            initialValues:state.entities.stServices[state.dialog.id]
        }
    }, {
        getServicesTree,
        createService,
        updateService,
        hideDialog
    })(Update)