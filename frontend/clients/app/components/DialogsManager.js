import React, { Component, PropTypes } from 'react'

class DialogsManager extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.dialog){
            switch (this.props.dialog.type) {
                default:
                    <div>Empty</div>
            }
        }
        return null;
    }
}

export default DialogsManager;