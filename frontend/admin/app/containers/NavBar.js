import React, { Component, PropTypes,cloneElement  } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {Navbar,Nav,NavItem,MenuItem,NavDropdown} from 'react-bootstrap/lib';
import {LinkContainer} from 'react-router-bootstrap';

import {deleteToken} from 'actions/token';

export class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.render.bind(this);
    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Billing</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <LinkContainer to={{ pathname: '/services'}}>
                        <NavItem eventKey={1}>Services control</NavItem>
                    </LinkContainer>
                    <LinkContainer to={{ pathname: '/dashboard'}}>
                        <NavItem eventKey={1}>Orders</NavItem>
                    </LinkContainer>
                    <LinkContainer to={{ pathname: '/orders'}}>
                        <NavItem eventKey={1}>Orders test form</NavItem>
                    </LinkContainer>
                </Nav>
                <Nav pullRight>
                    <NavDropdown id="a1" eventKey={3} title={
                        <span><i className="fa fa-user"></i> Brek</span>
                    }>
                        <MenuItem eventKey={3.1}>Brek</MenuItem>
                        <MenuItem eventKey={3.2}>Change password</MenuItem>
                        <MenuItem divider/>
                        <MenuItem eventKey={3.3} onClick={this.props.deleteToken}>Logout</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
        )
    }
}
export const selector = createSelector(
    state=>state,
    function(state){
        return state;
    }
);

export default connect(selector,{
    deleteToken
})(NavigationBar);
