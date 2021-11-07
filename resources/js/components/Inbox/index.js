import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import InboxMessagingProvider, {
    InboxMessagingContext,
} from "../Context/InboxMessagingContext";

import ConversationSideBar from "./ConversationSideBar";
import Conversation from "./Conversation";

const index = withRouter((props) => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        let userInfoData = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfoData) {
            props.history.push("/login");
        } else {
            setUserInfo(userInfoData);
        }
    }, []);

    return (
        <InboxMessagingProvider>
            <InboxMessagingContext.Consumer>
                {({
                    setSearchTermHandler,
                    searchTerm,
                    fetchUserMessages,
                    userMessages,
                    inboxEmpty,
                    fetchConversationMessages,
                    filteredUserMessages,
                    conversationMessages,
                    messageSentClickedHandler,
                    messageReadClickedHandler,
                    setSentFromProfileHandler,
                    sentFromProfile,
                }) => {
                    return (
                        <div className="d-flex flex-column flex-md-row private-profile-main-container">
                            <ConversationSideBar
                                fetchUserMessages={fetchUserMessages}
                                userMessages={userMessages}
                                inboxEmpty={inboxEmpty}
                                fetchConversationMessages={
                                    fetchConversationMessages
                                }
                                filteredUserMessages={filteredUserMessages}
                                setSearchTermHandler={setSearchTermHandler}
                                searchTerm={searchTerm}
                                messageReadClickedHandler={
                                    messageReadClickedHandler
                                }
                                setSentFromProfileHandler={
                                    setSentFromProfileHandler
                                }
                            />
                            <div className="container main-header">
                                <Conversation
                                    conversationMessages={conversationMessages}
                                    messageSentClickedHandler={
                                        messageSentClickedHandler
                                    }
                                    sentFromProfile={sentFromProfile}
                                />
                            </div>
                        </div>
                    );
                }}
            </InboxMessagingContext.Consumer>
        </InboxMessagingProvider>
    );
});

export default index;
