import React from "react";

const Head = ({ profileData, profileColor }) => {
    const appUrl = process.env.MIX_APP_URL;
    console.log(profileData, "profile");

    return (
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
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
                {profileData && (
                    <span className="mr-2 fs-22">
                        Gamertag: {profileData.user.gamertag}
                    </span>
                )}
                <button className="my-3 mr-md-2 bttn-material-flat bttn-sm update-account-modal-btn">
                    Send Message
                </button>
                <button className="bttn-material-flat bttn-sm update-account-modal-btn">
                    Invite to squad
                </button>
                <div className="fs-16">
                    {profileData && <p>{profileData.first_name}</p>}
                    {profileData && (
                        <span>Username: {profileData.user.username}</span>
                    )}
                    <p>{profileData ? profileData.bio : "No bio"}</p>
                </div>
            </div>
        </div>
    );
};

export default Head;
