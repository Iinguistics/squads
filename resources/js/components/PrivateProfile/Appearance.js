import React from "react";
import { withRouter } from "react-router-dom";
import ChatPreview from "./ChatPreview";
//import ProfileUpdateForm from "../Utils/Forms/ProfileUpdateForm";

const Appearance = withRouter(
    ({ fetchProfileHandler, profileData, error, success, userInfo }) => {
        return (
            <div className="container">
                <h2>Appearance</h2>
                <ChatPreview
                    fetchProfileHandler={fetchProfileHandler}
                    profileData={profileData}
                    error={error}
                    success={success}
                    userInfo={userInfo}
                />
            </div>
        );
    }
);

export default Appearance;
