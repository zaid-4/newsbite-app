import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

export const Header = ({ isAuthenticated, user, onLogout }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleLogout = () => {
    onLogout();
    setShowProfileDropdown(false);
  };

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          NewsBite
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            {isAuthenticated ? (
              <>
                <NavDropdown
                  title={
                    <div className="avatar">{user?.name[0].toUpperCase()}</div>
                  }
                  id="profile-dropdown"
                  show={showProfileDropdown}
                  onClick={toggleProfileDropdown}
                >
                  <NavDropdown.Item
                    onClick={toggleProfileDropdown}
                    as={Link}
                    to="/profile"
                  >
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={toggleProfileDropdown}
                    as={Link}
                    to="/preferences"
                  >
                    News Preferences
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} as={Link} to="/">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
