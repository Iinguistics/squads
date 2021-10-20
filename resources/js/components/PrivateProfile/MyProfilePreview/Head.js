import React from "react";

const Head = ({ userInfo, profileData, profileColor }) => {
    const appUrl = process.env.MIX_APP_URL;

    return (
        <div className="d-flex justify-content-center align-items-center">
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

            <div className="private-profile-preview-head-item-2">
                <span className="mr-2 private-profile-preview-head-item-2-gamertag">
                    gamertag
                </span>
                <button className="mr-2 bttn-material-flat bttn-sm update-account-modal-btn">
                    Send Message
                </button>
                <button className="bttn-material-flat bttn-sm update-account-modal-btn">
                    Invite to squad
                </button>

                {profileData && <p>{profileData.first_name}</p>}
                {userInfo && <span>Username: {userInfo.username}</span>}
                <p>Bio: {profileData ? profileData.bio : ""}</p>
            </div>
        </div>
    );
};

export default Head;
