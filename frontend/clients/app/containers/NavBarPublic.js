import React, { Component, PropTypes,cloneElement  } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {Navbar,Nav,NavItem,MenuItem,NavDropdown} from 'react-bootstrap/lib';
import {LinkContainer} from 'react-router-bootstrap';

import {deleteToken} from 'actions/token';

export const selector = createSelector(
    state=>state.entities.users,
    state=>state.token,
    function (users,token) {
        return {
            user:token && users[token.userId] ? users[token.userId]:null
        };
    }
);

@connect(selector,{
    deleteToken
})
export default class NavBarPublic extends Component {
    constructor(props) {
        super(props);
        this.render.bind(this);
    }

    render() {
        const {user} = this.props;
        let loginMenu;
        if (user) {
            loginMenu =
                <LinkContainer to={{ pathname: '/panel/dashboard'}}>
                    <NavItem eventKey={1}>Control panel: {user.username}</NavItem>
                </LinkContainer>
        } else {
            loginMenu =
                <LinkContainer to={{ pathname: '/login'}}>
                    <NavItem eventKey={1}>Log in</NavItem>
                </LinkContainer>
        }
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Billing-clients</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <LinkContainer to={{ pathname: '/orders'}}>
                        <NavItem eventKey={1}>Orders</NavItem>
                    </LinkContainer>
                 </Nav>
                <Nav pullRight>
                    {loginMenu}
                </Nav>
            </Navbar>
        )
    }
}

