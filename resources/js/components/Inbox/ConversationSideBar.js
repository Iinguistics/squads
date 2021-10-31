import React, { useEffect, useState } from "react";

const ConversationSideBar = ({
    setSearchTermHandler,
    searchTerm,
    fetchUserMessages,
    userMessages,
    inboxEmpty,
    fetchConversationMessages,
    filterUserMessagesHandler,
    filteredUserMessages,
}) => {
    // const [filteredUserMessages, setFilteredUserMessages] = useState([]);

    useEffect(() => {
        fetchUserMessages();

        // setTimeout(() => {
        //     setFilteredUserMessages([...userMessages]);
        // }, 600);
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

    // const renderUserConversations = () => {
    //     if (userMessages) {
    //         const userNames = {};

    //         return userMessages.map((message) => {
    //             if (!(message.sent_from_username in userNames)) {
    //                 userNames[message.sent_from_username] = true;
    //                 return (
    //                     <div key={message.message_id} className="mb-1">
    //                         <h5>{message.sent_from_username}</h5>
    //                     </div>
    //                 );
    //             }
    //         });
    //     }
    // };

    const renderUserConversations = () => {
        if (searchTerm && filteredUserMessages) {
            const userNames = {};

            return filteredUserMessages.map((message) => {
                if (!(message.sent_from_username in userNames)) {
                    userNames[message.sent_from_username] = true;
                    return (
                        <div key={message.message_id} className="mb-1">
                            <h5>{message.sent_from_username}</h5>
                        </div>
                    );
                }
            });
        }
    };
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
                                    className="shadow-none search-conversation-input mb-4"
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
