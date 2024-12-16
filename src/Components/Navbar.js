import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import { useUser } from "../Contexts/UserContext";

const NavigationBar = () => {
  const { user, logout } = useUser();

  return (
    <>
      <Navbar expand="md" bg="warning">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {user ? (
                <>
                  <Nav.Link as={NavLink} to="/bookmark">
                    Bookmark
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/rating">
                    Rating
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/searchhistory">
                    Search History
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/" onClick={logout}>
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Important: Render child routes here */}
      <Outlet />
    </>
  );
};

export default NavigationBar;