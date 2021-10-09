import React from "react";
import { withRouter } from "react-router-dom";
import ChatPreview from "./ChatPreview";
import FontColor from "./FontColor";
import ProfileColor from "./ProfileColor";

const Appearance = withRouter(
    ({
        fetchProfileHandler,
        profileData,
        userInfo,
        fontColorHandler,
        fontColor,
        profileColorHandler,
        profileColor,
    }) => {
        return (
            <div className="container">
                <h2>Appearance</h2>
                <ChatPreview
                    fetchProfileHandler={fetchProfileHandler}
                    profileData={profileData}
                    userInfo={userInfo}
                    fontColor={fontColor}
                    profileColor={profileColor}
                />
                <FontColor
                    fetchProfileHandler={fetchProfileHandler}
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
