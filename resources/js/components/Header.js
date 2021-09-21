import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
    const [userInfo, setUserInfo] = useState(
        JSON.parse(localStorage.getItem("userInfo"))
    );

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo !== user) {
            setUserInfo(user);
        }
    }, []);

    const test = () => {
        console.log("ran");
    };

    const renderAuthItems = () => {
        if (userInfo) {
            return (
                <>
                    <LinkContainer to="/profile">
                        <NavDropdown.Item className="dropdown-item">
                            Profile
                        </NavDropdown.Item>
                    </LinkContainer>
                    <span onClick={test}>
                        <NavDropdown.Item className="dropdown-item">
                            Sign Out
                        </NavDropdown.Item>
                    </span>
                </>
            );
        } else {
            return (
                <>
                    <LinkContainer to="/login">
                        <NavDropdown.Item className="dropdown-item">
                            Sign In
                        </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/register">
                        <NavDropdown.Item className="dropdown-item">
                            Create Account
                        </NavDropdown.Item>
                    </LinkContainer>
                </>
            );
        }
    };

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
                        <Nav className="ml-auto">{renderAuthItems()}</Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
