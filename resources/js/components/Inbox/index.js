import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import InboxMessagingProvider, {
    InboxMessagingContext,
} from "../Context/InboxMessagingContext";

import ConversationSideBar from "./ConversationSideBar";

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
                    fetchUserMessages,
                    userMessages,
                    inboxEmpty,
                    fetchConversationMessages,
                    conversationMessages,
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
                            />
                        </div>
                    );
                }}
            </InboxMessagingContext.Consumer>
        </InboxMessagingProvider>
    );
});

export default index;
