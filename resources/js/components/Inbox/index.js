import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Api from "../Api";
import InboxMessagingProvider, {
    InboxMessagingContext,
} from "../Context/InboxMessagingContext";

import ConversationSideBar from "./ConversationSideBar";
import Conversation from "./Conversation";

const index = withRouter((props) => {
    const [userInfo, setUserInfo] = useState(null);
    const [profileData, setProfileData] = useState(null);

    const fetchProfileData = async () => {
        const { data } = await Api.get("/show_current_user_profile");
        setProfileData(data.data[0]);
    };

    useEffect(() => {
        let userInfoData = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfoData) {
            props.history.push("/login");
        } else {
            setUserInfo(userInfoData);
        }

        fetchProfileData();
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
                    setSentFromUsernameHandler,
                    sentFromUsername,
                }) => {
                    return (
                        <div className="d-flex flex-column flex-md-row conversation-sidebar">
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
                                setSentFromUsernameHandler={
                                    setSentFromUsernameHandler
                                }
                            />
                            <div className="main-header">
                                <Conversation
                                    conversationMessages={conversationMessages}
                                    messageSentClickedHandler={
                                        messageSentClickedHandler
                                    }
                                    sentFromProfile={sentFromProfile}
                                    profileData={profileData}
                                    sentFromUsername={sentFromUsername}
                                    fetchConversationMessages={
                                        fetchConversationMessages
                                    }
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
