import React, { useEffect, useState } from "react";

const ConversationSideBar = ({
    fetchUserMessages,
    userMessages,
    inboxEmpty,
    fetchConversationMessages,
}) => {
    const [filteredUserMessages, setFilteredUserMessages] =
        useState(userMessages);

    useEffect(() => {
        fetchUserMessages();
    }, []);

    console.log("sidebar", inboxEmpty);
    console.log(userMessages, "sidebar");
    const appUrl = process.env.MIX_APP_URL;

    const checkInboxEmpty = () => {
        if (inboxEmpty) {
            return (
                <div className="m-auto">
                    <img
                        src={`${appUrl}/images/empty-2.png`}
                        alt="empty"
                        className="profile-preview-photo mr-2"
                    />
                    <span className="text-muted">No Messages</span>
                </div>
            );
        }
    };
    return (
        <div className="private-profile-sidebar-container">
            <div className="container main-header">
                <div className="container mt-5 main-header">
                    <div className="d-flex flex-row flex-md-column justify-content-between text-center">
                        {!inboxEmpty && (
                            <div className="item-1">
                                <input
                                    type="text"
                                    placeholder="Search by username"
                                    // value={username}
                                    // onChange={(e) => setUsername(e.target.value)}
                                    className="shadow-none search-conversation-input"
                                />
                            </div>
                        )}
                        {checkInboxEmpty()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConversationSideBar;
