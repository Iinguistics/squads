import React from "react";
import { withRouter } from "react-router-dom";
import ChatPreview from "./ChatPreview";
//import ProfileUpdateForm from "../Utils/Forms/ProfileUpdateForm";

const Appearance = withRouter(
    ({ fetchProfileHandler, profileData, error, success }) => {
        return (
            <div className="container">
                <h1 className="text-center">Appearance</h1>
                <ChatPreview
                    fetchProfileHandler={fetchProfileHandler}
                    profileData={profileData}
                    error={error}
                    success={success}
                />
            </div>
        );
    }
);

export default Appearance;
