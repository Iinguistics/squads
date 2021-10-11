import React from "react";
import { withRouter } from "react-router-dom";

const Privacy = withRouter((props) => {
    return (
        <div className="container">
            <h2>Privacy</h2>
            <p>Direct Messaging</p>
            <p className="text-muted">
                Choose who can send you messages that you will receive in your
                inbox.
            </p>
        </div>
    );
});

export default Privacy;
