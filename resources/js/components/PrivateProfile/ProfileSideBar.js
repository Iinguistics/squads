import React from "react";
import { Container, Form, Row, Col } from "react-bootstrap";

const ProfileSideBar = () => {
    return (
        <div className="private-profile-sidebar-container">
            <div className="container mt-5 main-header">
                <div className="d-flex flex-column  align-items-center">
                    <div className="private-profile-sidebar-cat-head mb-2">
                        user settings
                    </div>
                    <div className="private-profile-sidebar-cat-content mb-2 content-active">
                        My Account
                    </div>
                    <div className="private-profile-sidebar-cat-content mb-2">
                        User Profile
                    </div>
                    <div className="private-profile-sidebar-cat-content mb-2">
                        Privacy
                    </div>
                    <div className="private-profile-sidebar-divider my-2"></div>
                    <div className="private-profile-sidebar-cat-head mb-2">
                        my squads
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSideBar;
