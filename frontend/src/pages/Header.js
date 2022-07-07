import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

import icon from '../asserts/icon.png'; 

const Header = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand>
                    <img
                    alt=""
                    src={icon}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    />{' '}
                    THRU
                </Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;