import React from "react";
import { Container, Form, Row, Col } from "react-bootstrap";

const ProfileSideBar = () => {
    return (
        <div className="private-profile-sidebar-container">
            <div className="container mt-5 main-header">
                <div className="d-flex flex-column  align-items-center">
                    <div className="private-profile-sidebar-cat-head mb-2">
                        profile settings
                    </div>
                    <div className="private-profile-sidebar-cat-content mb-2 content-active">
                        My Profile
                    </div>
                    <div className="private-profile-sidebar-cat-content mb-2 content-active">
                        General Info
                    </div>
                    <div className="private-profile-sidebar-cat-content mb-2">
                        Upload Photo
                    </div>
                    <div className="private-profile-sidebar-cat-content mb-2">
                        Privacy
                    </div>
                    <div className="private-profile-sidebar-divider my-2"></div>
                    <div className="private-profile-sidebar-cat-head mb-2">
                        my squads
                    </div>
                    <div className="private-profile-sidebar-divider my-2"></div>
                    <div className="private-profile-sidebar-cat-head mb-2">
                        app settings
                    </div>
                    <div className="private-profile-sidebar-divider my-2"></div>
                    <div className="private-profile-sidebar-cat-head mb-2">
                        user settings
                    </div>
                    <div className="private-profile-sidebar-cat-content mb-2">
                        Email
                    </div>
                    <div className="private-profile-sidebar-cat-content mb-2">
                        Gamertag
                    </div>
                    <div className="private-profile-sidebar-cat-content mb-2">
                        Activision Id
                    </div>
                    <div className="private-profile-sidebar-cat-content mb-2">
                        Password
                    </div>
                    <div className="private-profile-sidebar-cat-content mb-2 text-danger">
                        Delete Account
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSideBar;
