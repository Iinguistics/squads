import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import DirectMessaging from "./DirectMessaging";
import ProfileView from "./ProfileView";
import SquadInvite from "./SquadInvite";

const Index = withRouter(({ fetchPrivateProfileHandler, profileData }) => {
    useEffect(() => {
        fetchPrivateProfileHandler();
    }, []);
    return (
        <div className="col-12 col-md-7">
            <h2 className="mb-5">Privacy</h2>
            <DirectMessaging
                fetchPrivateProfileHandler={fetchPrivateProfileHandler}
                profileData={profileData}
            />
            <ProfileView
                fetchPrivateProfileHandler={fetchPrivateProfileHandler}
                profileData={profileData}
            />
            <SquadInvite
                fetchPrivateProfileHandler={fetchPrivateProfileHandler}
                profileData={profileData}
            />
        </div>
    );
});

export default Index;
