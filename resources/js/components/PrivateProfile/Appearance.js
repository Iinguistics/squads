import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import ChatPreview from "./ChatPreview";
import FontColor from "./FontColor";
import ProfileColor from "./ProfileColor";

const Appearance = withRouter(
    ({
        fetchPrivateProfileHandler,
        profileData,
        userInfo,
        fontColorHandler,
        fontColor,
        profileColorHandler,
        profileColor,
    }) => {
        useEffect(() => {
            fetchPrivateProfileHandler();
        }, []);

        return (
            <div className="container">
                <h2 className="text-center text-md-left">Appearance</h2>
                <ChatPreview
                    profileData={profileData}
                    userInfo={userInfo}
                    fontColor={fontColor}
                    profileColor={profileColor}
                />
                <FontColor
                    fontColor={fontColor}
                    fontColorHandler={fontColorHandler}
                />
                <ProfileColor
                    profileColor={profileColor}
                    profileColorHandler={profileColorHandler}
                />
            </div>
        );
    }
);

export default Appearance;
