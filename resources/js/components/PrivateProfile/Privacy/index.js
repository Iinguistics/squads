import React from "react";
import { withRouter } from "react-router-dom";
import DirectMessaging from "./DirectMessaging";

const Index = withRouter((props) => {
    return (
        <div className="container">
            <h2>Privacy</h2>
            <DirectMessaging />
        </div>
    );
});

export default Index;
