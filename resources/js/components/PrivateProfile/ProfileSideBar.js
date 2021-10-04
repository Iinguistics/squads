import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import DeleteAccountModal from "../Utils/Modals/DeleteAccountModal";
import EmailModal from "../Utils/Modals/UserSettings/EmailModal";
import GamertagModal from "../Utils/Modals/UserSettings/GamertagModal";

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
    emailClickedHandler,
    emailClicked,
    gamertagClickedHandler,
    gamertagClicked,
}) => {
    return (
        <div className="private-profile-sidebar-container">
            <div className="container mt-5 main-header">
                <div className="d-flex flex-row flex-md-column justify-content-between align-items-center flex-wrap">
                    <div>
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
                    </div>
                    <div className="private-profile-sidebar-divider my-2"></div>
                    <div>
                        <div className="private-profile-sidebar-cat-head mb-2">
                            my squads
                        </div>
                    </div>
                    <div className="private-profile-sidebar-divider my-2"></div>
                    <div>
                        <div className="private-profile-sidebar-cat-head mb-2">
                            app settings
                        </div>
                        <div className="private-profile-sidebar-cat-content mb-2">
                            Appearance
                        </div>
                    </div>
                    <div className="private-profile-sidebar-divider my-2"></div>
                    <div>
                        <div className="private-profile-sidebar-cat-head mb-2">
                            user settings
                        </div>
                        <div
                            className="private-profile-sidebar-cat-content mb-2"
                            onClick={() => emailClickedHandler()}
                        >
                            Email
                        </div>
                        <div
                            className="private-profile-sidebar-cat-content mb-2"
                            onClick={() => gamertagClickedHandler()}
                        >
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
                    </div>
                </div>
            </div>
            <DeleteAccountModal
                deleteAccountClicked={deleteAccountClicked}
                loggedInToggleHandler={loggedInToggleHandler}
            />
            <EmailModal emailClicked={emailClicked} tabHandler={tabHandler} />
            <GamertagModal
                gamertagClicked={gamertagClicked}
                tabHandler={tabHandler}
            />
        </div>
    );
};

export default ProfileSideBar;
