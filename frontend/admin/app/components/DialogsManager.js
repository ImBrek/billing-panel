import React, { Component, PropTypes } from 'react'

import ServiceCreateDialog from 'containers/dialogs/service/Create'

class DialogsManager extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.dialog){
            switch (this.props.dialog.type) {
                case 'serviceCreate':
                    return <ServiceCreateDialog/>;
                default:
                    <div>ХЗ!</div>
            }
        }
        return null;
    }
}

export default DialogsManager;