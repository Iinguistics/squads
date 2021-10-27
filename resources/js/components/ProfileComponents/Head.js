import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import SocialLinks from "./SocialLinks";
import Api from "../Api";
import SendMessageModal from "../Utils/Modals/SendMessageModal";
import SendSquadInviteModal from "../Utils/Modals/SendSquadInviteModal";

const Head = withRouter(
    ({ profileData, profileColor, preview, match, userInfo }) => {
        const [sendMessageClicked, setSendMessageClicked] = useState(0);
        const [sendSquadInviteClicked, setSendSquadInviteClicked] = useState(0);

        console.log(profileData, "profile data logged from profile Head");

        const renderButtons = () => {
            if (userInfo) {
                if (
                    preview === true ||
                    Number(match.params.id) === userInfo.id
                ) {
                    return;
                } else {
                    return (
                        <div>
                            <button
                                className="my-3 mr-md-2 bttn-material-flat bttn-sm update-account-modal-btn"
                                onClick={sendMessageClickedHandler}
                            >
                                Send Message
                            </button>
                            <button
                                className="bttn-material-flat bttn-sm update-account-modal-btn"
                                onClick={sendSquadInviteClickedHandler}
                            >
                                Invite to squad
                            </button>
                        </div>
                    );
                }
            }
        };

        const sendMessageClickedHandler = () => {
            setSendMessageClicked(
                (sendMessageClicked) => sendMessageClicked + 1
            );
        };

        const sendSquadInviteClickedHandler = () => {
            setSendSquadInviteClicked(
                (sendSquadInviteClicked) => sendSquadInviteClicked + 1
            );
        };

        const appUrl = process.env.MIX_APP_URL;
        return (
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center shadow-sm p-3 mb-5 bg-white rounded">
                <div className="item-1 mr-5">
                    <img
                        src={
                            profileData
                                ? profileData.photo
                                    ? profileData.photo
                                    : `${appUrl}/images/default-photo-black-outline.png`
                                : `${appUrl}/images/default-photo-black-outline.png`
                        }
                        alt="profile photo"
                        className={`profile-preview-photo appearance-profile-color-${profileColor}`}
                    />
                </div>
                <div className="private-profile-preview-head-item-2 mt-2 mt-md-0">
                    {profileData && (
                        <span className="mr-3 fs-22">
                            {profileData.user ? profileData.user.gamertag : ""}
                        </span>
                    )}
                    {renderButtons()}
                    <div className="fs-16 mt-3 mt-md-0">
                        {profileData && (
                            <>
                                <span>
                                    Username:{" "}
                                    {profileData.user
                                        ? profileData.user.username
                                        : ""}
                                </span>
                                <br />
                            </>
                        )}
                        {profileData && (
                            <>
                                <span>
                                    Platform:{" "}
                                    {profileData.user
                                        ? profileData.user.platform
                                        : ""}
                                </span>
                                <br />
                            </>
                        )}
                        <p>{profileData ? profileData.bio : "No bio"}</p>
                    </div>
                    <SocialLinks profileData={profileData} />
                </div>
                <SendMessageModal
                    sendMessageClicked={sendMessageClicked}
                    userInfo={userInfo}
                    profileData={profileData}
                />
                <SendSquadInviteModal
                    sendSquadInviteClicked={sendSquadInviteClicked}
                />
            </div>
        );
    }
);

Head.defaultProps = {
    preview: false,
};

export default Head;
