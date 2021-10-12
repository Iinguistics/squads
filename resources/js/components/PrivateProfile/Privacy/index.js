import React from "react";
import { withRouter } from "react-router-dom";
import DirectMessaging from "./DirectMessaging";

const Index = withRouter((props) => {
    return (
        <div className="col-12 col-md-7">
            <h2>Privacy</h2>
            <DirectMessaging />
        </div>
    );
});

export default Index;
