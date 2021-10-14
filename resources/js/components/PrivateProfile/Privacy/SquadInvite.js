import React, { useState } from "react";
import Api from "../../Api";
import { ALL, NONE } from "./Types";

const SquadInvite = ({ fetchProfileHandler, profileData }) => {
    const [error, setError] = useState(null);

    const updateProfileHandler = async (tab) => {
        try {
            let value = { privacy_squad_invite: tab };
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
        <div className="mb-5">
            <p>Squad Invites</p>
            <p className="text-muted">Choose to allow squad invites</p>
            {error && <span className="text-danger">{error}</span>}
            <div
                className="d-flex flex-row align-items-center privacy-content-bg p-3 mb-3"
                onClick={() => updateProfileHandler(ALL)}
            >
                <div className="mr-2">
                    <div
                        className={
                            profileData
                                ? profileData.privacy_squad_invite === ALL
                                    ? "privacy-circle privacy-circle-active shadow"
                                    : "privacy-circle"
                                : "privacy-circle"
                        }
                    ></div>
                </div>
                <div className="mr-3">
                    <img
                        src={`${appUrl}/images/privacy/privacy-messaging-users.png`}
                        alt="all users"
                        className="privacy-icon"
                    />
                </div>
                <div>
                    <span>Allow users to send me squad invites</span>
                </div>
            </div>

            <div
                className="d-flex flex-row align-items-center privacy-content-bg p-3"
                onClick={() => updateProfileHandler(NONE)}
            >
                <div className="mr-2">
                    <div
                        className={
                            profileData
                                ? profileData.privacy_squad_invite === NONE
                                    ? "privacy-circle privacy-circle-active shadow"
                                    : "privacy-circle"
                                : "privacy-circle"
                        }
                    ></div>
                </div>
                <div className="mr-3">
                    <img
                        src={`${appUrl}/images/privacy/privacy-messaging-block.png`}
                        alt="all users"
                        className="privacy-icon"
                    />
                </div>
                <div>
                    <span>Do not allow users to send me squad invites</span>
                </div>
            </div>
        </div>
    );
};

export default SquadInvite;
