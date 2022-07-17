import React, { useState, useEffect } from 'react';
import {
  Navbar,
  Container,
  FormControl,
  Nav,
  NavDropdown,
} from 'react-bootstrap';
import logo from '../../images/logo.png';
import login from '../../images/login.png';
import cart from '../../images/cart.png';
import NavbarSearchHook from '../../hook/search/navbar-search-hook';
const NavBarLogin = () => {
  const [user, setUser] = useState('');
  const [OnChangeSearch] = NavbarSearchHook();

  let word = '';
  if (localStorage.getItem('searchWord') !== null) {
    word = localStorage.getItem('searchWord');
  }

  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  const logOut = () => {
    setUser(localStorage.removeItem('user'));
  };

  console.log('USER INFO');
  console.log(user);

  return (
    <Navbar className="sticky-top" bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand>
          <a href="/">
            <img src={logo} className="logo" />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <FormControl
            type="search"
            placeholder="ابحث..."
            className="me-2 w-100 text-center"
            aria-label="Search"
            value={word}
            onChange={OnChangeSearch}
          />
          <Nav className="me-auto">
            {user !== '' ? (
              <NavDropdown title={user.name} id="basic-nav-dropdown">
                {user.role === 'admin' ? (
                  <NavDropdown.Item href="/admin/allproducts">
                    لوحة التحكم
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item href="/user/profile">
                    الصفحه الشخصية
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logOut} href="/">
                  تسجيل خروج
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link
                href="/login"
                className="nav-text d-flex mt-3 justify-content-center"
              >
                <img src={login} className="login-img" alt="sfvs" />
                <p style={{ color: 'white' }}>دخول</p>
              </Nav.Link>
            )}

            <Nav.Link
              href="/cart"
              className="nav-text d-flex mt-3 justify-content-center"
              style={{ color: 'white' }}
            >
              <img src={cart} className="login-img" alt="sfvs" />
              <p style={{ color: 'white' }}>العربه</p>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarLogin;
