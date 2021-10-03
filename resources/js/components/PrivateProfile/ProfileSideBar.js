import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import DeleteAccountModal from "../Utils/Modals/DeleteAccountModal";

const ProfileSideBar = ({
    myProfileTab,
    generalInfoTab,
    uploadPhotoTab,
    privacyTab,
    appearanceTab,
    emailTab,
    gamertagTab,
    activisionIdTab,
    passwordTab,
    tabHandler,
    deleteAccountClickedHandler,
    deleteAccountClicked,
    loggedInToggleHandler,
}) => {
    return (
        <div className="private-profile-sidebar-container">
            <div className="container mt-5 main-header">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="private-profile-sidebar-cat-head mb-2">
                        profile settings
                    </div>
                    <div
                        onClick={() => tabHandler("myProfile")}
                        className={`private-profile-sidebar-cat-content mb-2 ${
                            myProfileTab ? "content-active" : ""
                        }`}
                    >
                        My Profile
                    </div>
                    <div
                        onClick={() => tabHandler("generalInfo")}
                        className={`private-profile-sidebar-cat-content mb-2 ${
                            generalInfoTab ? "content-active" : ""
                        }`}
                    >
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
                    <div className="private-profile-sidebar-cat-content mb-2">
                        Appearance
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
                    <div
                        className="private-profile-sidebar-cat-content mb-2 text-danger"
                        onClick={() => deleteAccountClickedHandler()}
                    >
                        Delete Account
                    </div>
                    <DeleteAccountModal
                        deleteAccountClicked={deleteAccountClicked}
                        loggedInToggleHandler={loggedInToggleHandler}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfileSideBar;
