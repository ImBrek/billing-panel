import React, { Component, PropTypes } from 'react'

import ServiceUpdateDialog from 'containers/dialogs/service/Update'
import OptionUpdateDialog from 'containers/dialogs/option/Update'

class DialogsManager extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.dialog){
            switch (this.props.dialog.type) {
                case 'serviceUpdate':
                    return <ServiceUpdateDialog/>;
                case 'optionUpdate':
                    return <OptionUpdateDialog/>;
                default:
                    <div>ХЗ!</div>
            }
        }
        return null;
    }
}

export default DialogsManager;