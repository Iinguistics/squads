import React from "react";
import { withRouter } from "react-router-dom";
import ChatPreview from "./ChatPreview";
import ProfileColors from "./ProfileColors";
//import ProfileUpdateForm from "../Utils/Forms/ProfileUpdateForm";

const Appearance = withRouter(
    ({
        fetchProfileHandler,
        profileData,
        error,
        success,
        userInfo,
        updateProfileHandler,
        fontColorHandler,
        fontColor,
    }) => {
        return (
            <div className="container">
                <h2>Appearance</h2>
                <ChatPreview
                    fetchProfileHandler={fetchProfileHandler}
                    profileData={profileData}
                    error={error}
                    success={success}
                    userInfo={userInfo}
                    fontColor={fontColor}
                />
                <ProfileColors
                    fetchProfileHandler={fetchProfileHandler}
                    profileData={profileData}
                    error={error}
                    success={success}
                    userInfo={userInfo}
                    fontColor={fontColor}
                    fontColorHandler={fontColorHandler}
                    updateProfileHandler={updateProfileHandler}
                />
            </div>
        );
    }
);

export default Appearance;
