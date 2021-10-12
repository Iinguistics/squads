import React from "react";
import { withRouter } from "react-router-dom";
import DirectMessaging from "./DirectMessaging";

const Index = withRouter(({ fetchProfileHandler, profileData }) => {
    return (
        <div className="col-12 col-md-7">
            <h2>Privacy</h2>
            <DirectMessaging
                fetchProfileHandler={fetchProfileHandler}
                profileData={profileData}
            />
        </div>
    );
});

export default Index;