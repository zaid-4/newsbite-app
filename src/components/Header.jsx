import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export const Header = ({ isAuthenticated, onLogout }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleLogout = () => {
    onLogout();
    setShowProfileDropdown(false);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
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
            {" "}
            {/* Right-aligned items */}
            {isAuthenticated ? (
              <>
                {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
                <NavDropdown
                  title={
                    <FaUserCircle
                      size={24}
                      onClick={toggleProfileDropdown}
                      style={{ cursor: "pointer" }}
                    />
                  }
                  id="profile-dropdown"
                  show={showProfileDropdown}
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
                    Preferences
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
