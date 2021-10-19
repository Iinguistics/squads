import React from "react";

const Head = ({ userInfo, profileData, profileColor }) => {
    const appUrl = process.env.MIX_APP_URL;

    return (
        <div>
            <img
                src={
                    profileData
                        ? profileData.photo
                            ? profileData.photo
                            : `${appUrl}/images/default-photo-black-outline.png`
                        : `${appUrl}/images/default-photo-black-outline.png`
                }
                alt="profile photo"
                className={`chat-preview-photo appearance-profile-color-${profileColor}`}
            />
        </div>
    );
};

export default Head;
