import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { children, inputValue } = this.props
        return (
            <div>
                {children}
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.node
}

function mapStateToProps(state, ownProps) {
    return {
    }
}

export default connect(mapStateToProps, {})(App)