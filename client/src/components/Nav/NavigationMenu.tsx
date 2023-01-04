import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavMenu = styled(Navbar)`
  // border: 10px solid white;

  width: 100%;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 10%;
  a {
    font-size: 2rem;
    font-weight: 700;
    color: var(--main-white);

    &:hover {
      color: white;
    }
  }
`;

const NavbarCollapse = styled(Container)`
  // border: 5px solid orange;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const NavLinkContainer = styled(Nav)`
  // border: 5px solid red;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const NavigationLinks = styled(NavLink)`
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.25);
  }
  &:active {
    transform: scale(1.4);
  }
`;

const NavigationMenu = () => {
  return (
    <NavMenu expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <NavLinkContainer>
            <NavigationLinks to="/">Home</NavigationLinks>
            <NavigationLinks to="/search">Search</NavigationLinks>
            <NavigationLinks to="/login">Login</NavigationLinks>
          </NavLinkContainer>
        </NavbarCollapse>
      </Container>
    </NavMenu>
  );
};

export default NavigationMenu;
