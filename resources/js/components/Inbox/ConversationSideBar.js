import React, { useEffect, useState } from "react";

const ConversationSideBar = ({
    setSearchTermHandler,
    searchTerm,
    fetchUserMessages,
    userMessages,
    inboxEmpty,
    fetchConversationMessages,
    filteredUserMessages,
    messageReadClickedHandler,
}) => {
    const [usernameClicked, setUsernameClicked] = useState(Number);
    useEffect(() => {
        fetchUserMessages();
    }, []);

    console.log("sidebar", inboxEmpty);
    console.log(userMessages, "sidebar");

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

    const fetchConversationHandler = (sentFromId, messageId) => {
        setUsernameClicked(messageId);
        fetchConversationMessages(sentFromId);

        setTimeout(() => {
            messageReadClickedHandler();
            console.log("ran from sidebar");
        }, 700);
    };

    const renderUserConversations = () => {
        if (searchTerm && filteredUserMessages) {
            const userNames = {};

            return filteredUserMessages.map((message) => {
                if (!(message.sent_from_username in userNames)) {
                    userNames[message.sent_from_username] = true;
                    return (
                        <div
                            key={message.message_id}
                            className={`mb-2 conversation-sidebar-username ${
                                usernameClicked === message.message_id
                                    ? "content-active"
                                    : ""
                            }`}
                            onClick={() =>
                                fetchConversationHandler(
                                    message.sent_from_id,
                                    message.message_id
                                )
                            }
                        >
                            <img
                                src={
                                    message.sent_from_profile.photo
                                        ? message.sent_from_profile.photo
                                        : `${appUrl}/images/default-photo-black-outline.png`
                                }
                                alt="empty"
                                className="conversation-sidebar-photo mr-2"
                            />
                            <span>{message.sent_from_username}</span>
                        </div>
                    );
                }
            });
        } else {
            if (userMessages) {
                const userNames = {};

                return userMessages.map((message) => {
                    if (!(message.sent_from_username in userNames)) {
                        userNames[message.sent_from_username] = true;
                        return (
                            <div
                                key={message.message_id}
                                className={`mb-2 conversation-sidebar-username ${
                                    usernameClicked === message.message_id
                                        ? "content-active"
                                        : ""
                                }`}
                                onClick={() =>
                                    fetchConversationHandler(
                                        message.sent_from_id,
                                        message.message_id
                                    )
                                }
                            >
                                <img
                                    src={
                                        message.sent_from_profile.photo
                                            ? message.sent_from_profile.photo
                                            : `${appUrl}/images/default-photo-black-outline.png`
                                    }
                                    alt="empty"
                                    className="conversation-sidebar-photo mr-2"
                                />
                                <span>{message.sent_from_username}</span>
                            </div>
                        );
                    }
                });
            }
        }
    };
    const appUrl = process.env.MIX_APP_URL;

    return (
        <div className="private-profile-sidebar-container">
            <div className="container main-header">
                <div className="container mt-5 main-header">
                    <div className="d-flex flex-row flex-md-column justify-content-between text-center my-3">
                        {!inboxEmpty && (
                            <div className="item-1">
                                <input
                                    type="text"
                                    placeholder="Search by username"
                                    value={searchTerm}
                                    onChange={setSearchTermHandler}
                                    className="mb-4 shadow-none search-conversation-input"
                                />
                            </div>
                        )}
                        {checkInboxEmpty()}
                        {renderUserConversations()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConversationSideBar;
