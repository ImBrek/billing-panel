import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'

import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';

class WizardForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        // Pro tip: The best place to bind your member functions is in the component constructor
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
    }

    state = {
        page: 1
    };

    nextPage() {
        this.setState({page: this.state.page + 1});
    }

    previousPage() {
        this.setState({page: this.state.page - 1});
    }

    render() {
        const {onSubmit} = this.props;
        const {page} = this.state;
        return (<div>
                {page === 1 && <Page1 onSubmit={this.nextPage} entities={this.props.entities} servicesTree={this.props.servicesTree}/>}
                {page === 2 && <Page2 previousPage={this.previousPage} onSubmit={this.nextPage}/>}
                {page === 3 && <Page3 previousPage={this.previousPage} onSubmit={onSubmit}/>}
            </div>
        );
    }
}




export default connect(null, {

})(WizardForm)