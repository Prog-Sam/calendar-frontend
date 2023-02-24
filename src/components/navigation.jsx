import React, { Fragment } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = ({ currentUser, onLogout }) => {
  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          CALENDAR
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Link to='/events/new' className='nav-link'>
              ADD EVENT
            </Link>
            {currentUser && (
              <Fragment>
            <Link to='/settings' className='nav-link'>
              SETTINGS
            </Link>
                <Link to='/updatePassword' className='nav-link'>
                  {currentUser.name.toUpperCase()}
                </Link>
                <Link to='/#' className='nav-link' onClick={onLogout}>
                  LOGOUT
                </Link>
              </Fragment>
            )}
            {!currentUser && (
              <Fragment >
                <Link to='/login' className='nav-link'>
                LOGIN
              </Link>
              <Link to='/register' className='nav-link'>
              REGISTER
            </Link>
              </Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
