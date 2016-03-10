import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { createSelector } from 'reselect';

import DialogsManager from 'components/DialogsManager'
import Login from './Login'

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { children, inputValue } = this.props
        return (
            <div>
                {children}
                <DialogsManager dialog={this.props.dialog}/>
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.node
}

export const selector = createSelector(
    state => state.dialog,
    (dialog)=>{
        return {
            dialog
        }
    }
);

// return (
//     <div>
//         {children}
//         <DialogsManager dialog={this.props.dialog}/>
//     </div>
// )



export default connect(selector, {})(App)