import React from 'react';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { Logout } from '../';
import { useSelector, useDispatch } from 'react-redux';
import { select_topbar_navigation } from '../../../redux/actions/navigationActions';

const Topbar = () => {
    const name = useSelector(state => state.user.fName);
    const dispatch = useDispatch();

    return (
        <Navbar fixed="top" bg="light" variant="light">
            <Navbar.Brand>Icon Here</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title={name} id="basic-nav-dropdown">
                        <NavDropdown.Item key="Home" title={'Home'} onClick={(e) => dispatch(select_topbar_navigation('Home'))}>Home</NavDropdown.Item>
                        <NavDropdown.Item key="Analytics" title={'Analytics'} onClick={(e) => dispatch(select_topbar_navigation('Analytics'))}>Analytics</NavDropdown.Item>
                        <NavDropdown.Item key="My Account" title={'My Account'} onClick={(e) => dispatch(select_topbar_navigation('My Account'))}>My Account</NavDropdown.Item>
                        <NavDropdown.Item key="Logout" title={'Logout'}><Logout /></NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default Topbar;
