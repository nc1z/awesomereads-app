import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavMenu = styled(Navbar)`
  // border: 5px solid blue;
  z-index: 999;
  width: 100%;
  background-color: var(--main-background);
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  padding-bottom: 6rem;
  padding-top: 2rem;
  a {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--main-white);

    &:hover {
      color: white;
    }
  }

  @media (max-width: 480px) {
    a {
      font-size: 1.25rem;
    }
    padding-top: 1.5rem;
    padding-bottom: 2rem;
  }
`;

const NavbarCollapse = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const NavLinkContainer = styled(Nav)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const NavigationMenu = () => {
  return (
    <NavMenu expand="lg">
      <Container>
        <NavbarCollapse id="basic-navbar-nav">
          <NavLinkContainer>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "current navlink" : "navlink"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                isActive ? "current navlink" : "navlink"
              }
            >
              Search
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "current navlink" : "navlink"
              }
            >
              Login
            </NavLink>
          </NavLinkContainer>
        </NavbarCollapse>
      </Container>
    </NavMenu>
  );
};

export default NavigationMenu;
