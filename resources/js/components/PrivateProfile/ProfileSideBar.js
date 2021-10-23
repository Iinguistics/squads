import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import DeleteAccountModal from "../Utils/Modals/DeleteAccountModal";
import EmailModal from "../Utils/Modals/UserSettings/EmailModal";
import GamertagModal from "../Utils/Modals/UserSettings/GamertagModal";
import ActivisionIdModal from "../Utils/Modals/UserSettings/ActivisionIdModal";
import PasswordModal from "../Utils/Modals/UserSettings/PasswordModal";
import UploadPhotoModal from "../Utils/Modals/UploadPhotoModal";
import UsernameModal from "../Utils/Modals/UserSettings/UsernameModal";
import UploadImageModal from "../Utils/Modals/UploadImageModal";

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
    usernameClickedHandler,
    usernameClicked,
    gamertagClickedHandler,
    gamertagClicked,
    activisionClickedHandler,
    activisionClicked,
    passwordClickedHandler,
    passwordClicked,
    photoClickedHandler,
    photoClicked,
    fetchProfileHandler,
    imageClickedHandler,
    imageClicked,
}) => {
    return (
        <div className="private-profile-sidebar-container">
            <div className="container mt-5 main-header">
                <div className="d-flex flex-row flex-md-column justify-content-between">
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
                            Profile Photo
                        </div>
                        <div
                            onClick={() => tabHandler("appearance")}
                            className={`private-profile-sidebar-cat-content mb-2 ${
                                appearanceTab ? "content-active" : ""
                            }`}
                        >
                            Appearance
                        </div>
                        <div
                            className="private-profile-sidebar-cat-content mb-2"
                            onClick={() => imageClickedHandler()}
                        >
                            Upload Image
                        </div>
                        <div
                            onClick={() => tabHandler("privacy")}
                            className={`private-profile-sidebar-cat-content mb-2 ${
                                privacyTab ? "content-active" : ""
                            }`}
                        >
                            Privacy
                        </div>
                    </div>
                    <div className="private-profile-sidebar-divider m-auto"></div>
                    <div className="m-auto">
                        <div className="private-profile-sidebar-cat-head my-2">
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
                            onClick={() => usernameClickedHandler()}
                        >
                            Username
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
                fetchProfileHandler={fetchProfileHandler}
            />
            <UploadImageModal
                imageClicked={imageClicked}
                tabHandler={tabHandler}
                fetchProfileHandler={fetchProfileHandler}
            />
            <DeleteAccountModal
                deleteAccountClicked={deleteAccountClicked}
                loggedInToggleHandler={loggedInToggleHandler}
            />
            <EmailModal emailClicked={emailClicked} tabHandler={tabHandler} />
            <UsernameModal
                usernameClicked={usernameClicked}
                tabHandler={tabHandler}
            />
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
