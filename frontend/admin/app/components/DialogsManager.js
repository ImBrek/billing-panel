import React, { Component, PropTypes } from 'react'

import ServiceUpdateDialog from 'containers/dialogs/service/Update'
import ServiceDeleteDialog from 'containers/dialogs/service/Delete'
import AddtServiceUpdateDialog from 'containers/dialogs/addtService/Update'
import CategoryUpdateDialog from 'containers/dialogs/category/Update'
import CategoryDeleteDialog from 'containers/dialogs/category/Delete'

class DialogsManager extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.dialog){
            switch (this.props.dialog.type) {
                case 'categoryUpdate':
                    return <CategoryUpdateDialog/>;
                case 'categoryDelete':
                    return <CategoryDeleteDialog/>;
                case 'serviceUpdate':
                    return <ServiceUpdateDialog/>;
                case 'serviceDelete':
                    return <ServiceDeleteDialog/>;
                case 'addtServiceUpdate':
                    return <AddtServiceUpdateDialog/>;
                default:
                    <div>ХЗ!</div>
            }
        }
        return null;
    }
}

export default DialogsManager;