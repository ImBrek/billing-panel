import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
         return (
            <div>
                Hello world;
             </div>
        )
    }
}


//export const selector = createSelector(
//    state => state.pages.login,
//    page => {
//        return {
//            page
//        }
//    }
//);

export default connect(null, {

})(Dashboard)