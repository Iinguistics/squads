import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import DeleteAccountModal from "../Utils/Modals/DeleteAccountModal";
import EmailModal from "../Utils/Modals/UserSettings/EmailModal";
import GamertagModal from "../Utils/Modals/UserSettings/GamertagModal";
import ActivisionIdModal from "../Utils/Modals/UserSettings/ActivisionIdModal";
import PasswordModal from "../Utils/Modals/UserSettings/PasswordModal";
import UploadPhotoModal from "../Utils/Modals/UploadPhotoModal";

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
    activisionClickedHandler,
    activisionClicked,
    passwordClickedHandler,
    passwordClicked,
    photoClickedHandler,
    photoClicked,
}) => {
    return (
        <div className="private-profile-sidebar-container">
            <div className="container mt-5 main-header">
                <div className="d-flex flex-row flex-md-column justify-content-between flex-wrap">
                    <div className="m-auto">
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
                        <div
                            className="private-profile-sidebar-cat-content mb-2"
                            onClick={() => photoClickedHandler()}
                        >
                            Upload Photo
                        </div>
                        <div className="private-profile-sidebar-cat-content mb-2">
                            Privacy
                        </div>
                    </div>
                    <div className="private-profile-sidebar-divider my-2 m-auto"></div>
                    <div className="m-auto">
                        <div className="private-profile-sidebar-cat-head mb-2">
                            my squads
                        </div>
                    </div>
                    <div className="private-profile-sidebar-divider my-2 m-auto"></div>
                    <div className="m-auto">
                        <div className="private-profile-sidebar-cat-head mb-2">
                            app settings
                        </div>
                        <div
                            onClick={() => tabHandler("appearance")}
                            className={`private-profile-sidebar-cat-content mb-2 ${
                                appearanceTab ? "content-active" : ""
                            }`}
                        >
                            Appearance
                        </div>
                    </div>
                    <div className="private-profile-sidebar-divider my-2 m-auto"></div>
                    <div className="m-auto">
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
                        <div
                            className="private-profile-sidebar-cat-content mb-2"
                            onClick={() => activisionClickedHandler()}
                        >
                            Activision Id
                        </div>
                        <div
                            className="private-profile-sidebar-cat-content mb-2"
                            onClick={() => passwordClickedHandler()}
                        >
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
            <UploadPhotoModal
                photoClicked={photoClicked}
                tabHandler={tabHandler}
            />
            <DeleteAccountModal
                deleteAccountClicked={deleteAccountClicked}
                loggedInToggleHandler={loggedInToggleHandler}
            />
            <EmailModal emailClicked={emailClicked} tabHandler={tabHandler} />
            <GamertagModal
                gamertagClicked={gamertagClicked}
                tabHandler={tabHandler}
            />
            <ActivisionIdModal
                activisionClicked={activisionClicked}
                tabHandler={tabHandler}
            />
            <PasswordModal
                passwordClicked={passwordClicked}
                tabHandler={tabHandler}
            />
        </div>
    );
};

export default ProfileSideBar;
