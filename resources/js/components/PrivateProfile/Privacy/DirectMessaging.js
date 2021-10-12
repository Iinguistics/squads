import React from "react";

const DirectMessaging = () => {
    return (
        <div>
            <p>Direct Messaging</p>
            <p className="text-muted">
                Choose who can send you messages that you will receive in your
                inbox.
            </p>
            <div className="d-flex flex-row align-items-center privacy-direct-messaging p-3 ">
                <div className="privacy-direct-messaging-item-1 mr-2">
                    <span className=" privacy-direct-messaging-item-1-circle"></span>
                </div>
                <div className="privacy-direct-messaging-item-2 mr-2">
                    <span>icon</span>
                </div>
                <div className="privacy-direct-messaging-item-3">
                    <span>Allow messages from all users</span>
                </div>
            </div>
        </div>
    );
};

export default DirectMessaging;
