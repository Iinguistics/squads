import React from "react";
import { withRouter } from "react-router-dom";
import ChatPreview from "./ChatPreview";
import ProfileColors from "./ProfileColors";
//import ProfileUpdateForm from "../Utils/Forms/ProfileUpdateForm";

const Appearance = withRouter(
    ({
        fetchProfileHandler,
        profileData,
        userInfo,
        fontColorHandler,
        fontColor,
        tabHandler,
    }) => {
        return (
            <div className="container">
                <h2>Appearance</h2>
                <ChatPreview
                    fetchProfileHandler={fetchProfileHandler}
                    profileData={profileData}
                    userInfo={userInfo}
                    fontColor={fontColor}
                />
                <ProfileColors
                    fetchProfileHandler={fetchProfileHandler}
                    profileData={profileData}
                    userInfo={userInfo}
                    fontColor={fontColor}
                    fontColorHandler={fontColorHandler}
                    tabHandler={tabHandler}
                />
            </div>
        );
    }
);

export default Appearance;
