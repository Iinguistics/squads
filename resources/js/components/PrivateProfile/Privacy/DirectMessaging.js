import React from "react";

const DirectMessaging = () => {
    const appUrl = process.env.MIX_APP_URL;
    return (
        <div>
            <p>Direct Messaging</p>
            <p className="text-muted">
                Choose who can send you messages that you will receive in your
                inbox.
            </p>
            <div className="d-flex flex-row align-items-center privacy-direct-messaging p-3 mb-3">
                <div className="privacy-direct-messaging-item-1 mr-1">
                    <div className="privacy-circle"></div>
                </div>
                <div className="privacy-direct-messaging-item-2 mr-3">
                    <img
                        src={`${appUrl}/images/privacy/privacy-messaging-users.png`}
                        alt="all users"
                        className="privacy-icon"
                    />
                </div>
                <div className="privacy-direct-messaging-item-3">
                    <span>Allow messages from all users</span>
                </div>
            </div>

            <div className="d-flex flex-row align-items-center privacy-direct-messaging p-3 mb-3">
                <div className="privacy-direct-messaging-item-1 mr-1">
                    <div className="privacy-circle"></div>
                </div>
                <div className="privacy-direct-messaging-item-2 mr-3">
                    <img
                        src={`${appUrl}/images/privacy/privacy-messaging-users.png`}
                        alt="all users"
                        className="privacy-icon"
                    />
                </div>
                <div className="privacy-direct-messaging-item-3">
                    <span>Allow messages only from your teammates</span>
                </div>
            </div>

            <div className="d-flex flex-row align-items-center privacy-direct-messaging p-3 ">
                <div className="privacy-direct-messaging-item-1 mr-1">
                    <div className="privacy-circle"></div>
                </div>
                <div className="privacy-direct-messaging-item-2 mr-3">
                    <img
                        src={`${appUrl}/images/privacy/privacy-messaging-users.png`}
                        alt="all users"
                        className="privacy-icon"
                    />
                </div>
                <div className="privacy-direct-messaging-item-3">
                    <span>Do not allow messages from any user</span>
                </div>
            </div>
        </div>
    );
};

export default DirectMessaging;
