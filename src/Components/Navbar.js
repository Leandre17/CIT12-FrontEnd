import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { NavLink } from "react-router";
import { Outlet } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import { useLocation } from "react-router";
import { useUser } from "../Contexts/UserContext"; // Import UserContext

const NavigationBar = () => {
  const { user, logout } = useUser(); // Access user state and logout function
  const location = useLocation();
  const isLoggedIn = !!user; // Check if user exists

  return (
    <>
      <Navbar expand="md" bg="warning">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav activeKey={location.pathname} variant="underline" className="me-auto">
              {isLoggedIn ? (
                <>
                  <Nav.Link as={NavLink} eventKey="A3" to="/bookmark">
                    Bookmark
                  </Nav.Link>
                  <Nav.Link as={NavLink} eventKey="A4" to="/rating">
                    Rating
                  </Nav.Link>
                  <Nav.Link as={NavLink} eventKey="A5" to="/searchhistory">
                    Search History
                  </Nav.Link>
                  <Nav.Link as={NavLink} eventKey="A6" to="/" onClick={logout}>
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={NavLink} eventKey="A2" to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
};

export default NavigationBar;
