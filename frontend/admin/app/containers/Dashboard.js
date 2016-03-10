import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect';
import {readCategory} from 'actions/category'
import {
    categoryUpdateShow,
    categoryDeleteShow,
} from 'actions/dialogs/category'

class Dashboard extends Component {
    constructor (props) {
        super(props)
        this.test = this.test.bind(this);
    }

    componentWillMount () {
        console.log('mount');
    }

    test(){
        var result = this.props.categoryDeleteShow(25);
    }


    render () {
        return (
            <div>
                <button onClick={this.test}>aa</button>
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
    readCategory,
    categoryDeleteShow
})(Dashboard)