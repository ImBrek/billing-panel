import React, {Component, PropTypes, cloneElement} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {Navbar, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap/lib';
import {LinkContainer} from 'react-router-bootstrap';

import {deleteToken} from 'actions/token';

export const selector = createSelector(
    state=>state.entities.users,
    state=>state.token,
    function (users,token) {
        return {
            user:token && users[token.userId] ? users[token.userId]:{}
        };
    }
);

@connect(selector, {
    deleteToken
})
export default class NavBar extends Component {
    constructor (props) {
        super(props);
        this.render.bind(this);
    }

    render () {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Billing-admin</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <LinkContainer to={{ pathname: '/dashboard'}}>
                        <NavItem eventKey={1}>Dashboard</NavItem>
                    </LinkContainer>
                    <LinkContainer to={{ pathname: '/orders'}}>
                        <NavItem eventKey={1}>Orders</NavItem>
                    </LinkContainer>
                    <LinkContainer to={{ pathname: '/services'}}>
                        <NavItem eventKey={1}>Services control</NavItem>
                    </LinkContainer>
                </Nav>
                <Nav pullRight>
                    <Nav pullRight>
                        <NavDropdown id="d1" eventKey={3} title={<span><i className="fa fa-user"></i> {this.props.user.username} </span>}>
                            <MenuItem eventKey={3.1} disabled>Change password</MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey={3.2} onClick={this.props.deleteToken}>Logout</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Nav>
            </Navbar>
        )
    }
}

