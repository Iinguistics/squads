import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import DirectMessaging from "./DirectMessaging";
import ProfileView from "./ProfileView";
import SquadInvite from "./SquadInvite";

const Index = withRouter(({ fetchProfileHandler, profileData }) => {
    useEffect(() => {
        fetchProfileHandler();
    }, []);
    return (
        <div className="col-12 col-md-7">
            <h2 className="mb-5">Privacy</h2>
            <DirectMessaging
                fetchProfileHandler={fetchProfileHandler}
                profileData={profileData}
            />
            <ProfileView
                fetchProfileHandler={fetchProfileHandler}
                profileData={profileData}
            />
            <SquadInvite
                fetchProfileHandler={fetchProfileHandler}
                profileData={profileData}
            />
        </div>
    );
});

export default Index;
