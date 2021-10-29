import React, { useEffect, useState } from "react";
import Api from "./Api";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import LogoutModal from "./Utils/Modals/LogoutModal";
import SearchModal from "./Utils/Modals/Search";

const Header = ({ loggedInToggle, loggedInToggleHandler }) => {
    const [userInfo, setUserInfo] = useState(
        JSON.parse(localStorage.getItem("userInfo"))
    );
    const [signOutClicked, setSignOutClicked] = useState(0);
    const [searchClicked, setSearchClicked] = useState(0);
    const [unreadMessages, setUnreadMessages] = useState(false);

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo !== user) {
            setUserInfo(user);
        }

        setTimeout(() => {
            fetchUserUnreadMessages();
        }, 600);
    }, [loggedInToggle]);

    const fetchUserUnreadMessages = async () => {
        if (userInfo) {
            try {
                const { data } = await Api.get("/get_user_unread_messages");
                if (data.data[0]) {
                    setUnreadMessages(true);
                } else {
                    return;
                }
            } catch (error) {
                return;
            }
        }
    };

    const renderUnreadMessages = () => {
        if (unreadMessages) {
            return <div className="inbox-notification-bubble"></div>;
        }
    };

    const signOutClickedHandler = () => {
        setSignOutClicked((signOutClicked) => signOutClicked + 1);
    };

    const searchClickedHandler = () => {
        setSearchClicked((searchClicked) => searchClicked + 1);
    };

    const renderAuthItems = () => {
        if (userInfo) {
            return (
                <>
                    <span onClick={searchClickedHandler}>
                        <NavDropdown.Item className="dropdown-item">
                            <img
                                className="search-img"
                                src={`${appUrl}/images/nav-search.png`}
                                alt="Search"
                            />
                            Search
                        </NavDropdown.Item>
                    </span>
                    <LinkContainer to="/profile">
                        <NavDropdown.Item className="dropdown-item">
                            Profile
                        </NavDropdown.Item>
                    </LinkContainer>
                    <span className="inbox-container">
                        <LinkContainer to="/inbox">
                            <NavDropdown.Item className="dropdown-item">
                                <img
                                    className="search-img mr-1"
                                    src={`${appUrl}/images/mail-inbox.png`}
                                    alt="Inbox"
                                />
                                Inbox
                                {renderUnreadMessages()}
                            </NavDropdown.Item>
                        </LinkContainer>
                    </span>
                    <span onClick={signOutClickedHandler}>
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
            <LogoutModal
                signOutClicked={signOutClicked}
                loggedInToggleHandler={loggedInToggleHandler}
            />

            <SearchModal searchClicked={searchClicked} />
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
