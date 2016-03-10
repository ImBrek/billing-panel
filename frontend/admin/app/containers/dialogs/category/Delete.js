import React, {Component, PropTypes} from 'react'
import {createSelector} from 'reselect'
import {Modal} from 'react-bootstrap'
import {connect} from 'react-redux'

import {hideDialog} from 'actions/dialogs'
import {deleteCategory} from 'actions/category'

class Delete extends Component {
    static propTypes = {
        hideDialog: PropTypes.func.isRequired,
        deleteCategory: PropTypes.func.isRequired
    };

    constructor (props) {
        super(props)
        this.save = this.save.bind(this);
        this.render = this.render.bind(this);
    }

    save (data) {
        this.props.deleteCategory(this.props.dialog.id);
    }

    render () {
        return (
            <Modal show={true} onHide={this.props.hideDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="alert alert-danger">Are you sure??</div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-default" onClick={this.props.hideDialog}>Cancel</button>
                    <button className="btn btn-primary"
                            onClick={this.save}>Ok
                    </button>
                </Modal.Footer>
            </Modal>
        )
    }
}


export default connect(
    (state)=> {
        return {
            dialog: state.dialog,
        }
    }, {
        deleteCategory,
        hideDialog
    })(Delete)