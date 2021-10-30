import React, { useEffect, useState } from "react";

const ConversationSideBar = ({ fetchUserMessages, userMessages }) => {
    useEffect(() => {
        fetchUserMessages();
    }, []);

    console.log(userMessages, "sidebar");
    return (
        <div className="private-profile-sidebar-container">
            <div className="container main-header">
                <div className="container mt-5 main-header">
                    <div className="d-flex flex-row flex-md-column justify-content-between text-center">
                        <div className="item-1">
                            <input
                                type="text"
                                placeholder="Search by username"
                                // value={username}
                                // onChange={(e) => setUsername(e.target.value)}
                                className="shadow-none search-conversation-input"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConversationSideBar;
