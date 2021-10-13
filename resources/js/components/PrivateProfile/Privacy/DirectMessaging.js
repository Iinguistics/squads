import React, { useEffect, useState } from "react";
import Api from "../../Api";

const DirectMessaging = ({ fetchProfileHandler, profileData }) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProfileHandler();
    }, []);

    const updateProfileHandler = async (tab) => {
        try {
            let value = { privacy_messaging: tab };
            const { data } = await Api.put(
                "/update_current_user_profile",
                value
            );

            if (data.success) {
                fetchProfileHandler();
                setError(false);
            } else {
                setError(true);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const appUrl = process.env.MIX_APP_URL;
    return (
        <div>
            <p>Direct Messaging</p>
            <p className="text-muted">
                Choose who can send you messages that you will receive in your
                inbox.
            </p>
            {error && <span className="text-danger">{error}</span>}
            <div
                className="d-flex flex-row align-items-center privacy-direct-messaging p-3 mb-3"
                onClick={() => updateProfileHandler("all")}
            >
                <div className="privacy-direct-messaging-item-1 mr-2">
                    <div
                        className={
                            profileData
                                ? profileData.privacy_messaging === "all"
                                    ? "privacy-circle privacy-circle-active"
                                    : "privacy-circle"
                                : "privacy-circle"
                        }
                    ></div>
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

            <div
                className="d-flex flex-row align-items-center privacy-direct-messaging p-3 mb-3"
                onClick={() => updateProfileHandler("teammates")}
            >
                <div className="privacy-direct-messaging-item-1 mr-2">
                    <div
                        className={
                            profileData
                                ? profileData.privacy_messaging === "teammates"
                                    ? "privacy-circle privacy-circle-active"
                                    : "privacy-circle"
                                : "privacy-circle"
                        }
                    ></div>
                </div>
                <div className="privacy-direct-messaging-item-2 mr-3">
                    <img
                        src={`${appUrl}/images/privacy/privacy-messaging-teammates.png`}
                        alt="all users"
                        className="privacy-icon"
                    />
                </div>
                <div className="privacy-direct-messaging-item-3">
                    <span>Allow messages only from your teammates</span>
                </div>
            </div>

            <div
                className="d-flex flex-row align-items-center privacy-direct-messaging p-3"
                onClick={() => updateProfileHandler("none")}
            >
                <div className="privacy-direct-messaging-item-1 mr-2">
                    <div
                        className={
                            profileData
                                ? profileData.privacy_messaging === "none"
                                    ? "privacy-circle privacy-circle-active"
                                    : "privacy-circle"
                                : "privacy-circle"
                        }
                    ></div>
                </div>
                <div className="privacy-direct-messaging-item-2 mr-3">
                    <img
                        src={`${appUrl}/images/privacy/privacy-messaging-block.png`}
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
