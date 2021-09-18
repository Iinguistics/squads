import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
    const appUrl = process.env.MIX_APP_URL;
    return (
        <>
            <Navbar
                expand="lg"
                collapseOnSelect
                fixed="top"
                className="shadow-sm"
            >
                <Container>
                    <LinkContainer
                        to="/"
                        className="d-flex flex-row justify-content-center align-items-center"
                    >
                        <Navbar.Brand>
                            <img
                                className="logo"
                                src={`${appUrl}/images/squads-logo.png`}
                                alt="Squads"
                            />
                            Squads
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        id="hamburger"
                    />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/profile">
                                <NavDropdown.Item className="dropdown-item">
                                    Sign In
                                </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/register">
                                <NavDropdown.Item className="dropdown-item">
                                    Create Account
                                </NavDropdown.Item>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
