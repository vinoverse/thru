import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const AdminHeader = () => {
    return (
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/admin/event">WAHT ADMIN</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Link to="/admin/event" className='nav-link'>Event</Link>
                <Link to="/admin/qrReader" className='nav-link'>QR Reader</Link>
                <Link to="/admin/ticket" className='nav-link'>Ticket</Link>
                <Link to="/admin/logout" className='nav-link'>Logout</Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
};

export default AdminHeader;