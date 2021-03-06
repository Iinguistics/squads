import React, { createContext, useState } from "react";
import Api from "../Api";

export const InboxMessagingContext = createContext();

const InboxMessagingProvider = (props) => {
    let userInfoData = JSON.parse(localStorage.getItem("userInfo"));

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const [inboxEmpty, setInboxEmpty] = useState(false);
    const [userMessages, setUserMessages] = useState(null);
    const [conversationMessages, setConversationMessages] = useState(null);
    const [sentFromProfile, setSentFromProfile] = useState({});
    const [sentFromUsername, setSentFromUsername] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUserMessages, setFilteredUserMessages] = useState(null);

    const [messageSentClicked, setMessageSentClicked] = useState(0);
    const [messageReadClicked, setMessageReadClicked] = useState(0);

    const messageSentClickedHandler = () => {
        setMessageSentClicked((messageSentClicked) => messageSentClicked + 1);
    };

    const messageReadClickedHandler = () => {
        setMessageReadClicked((messageReadClicked) => messageReadClicked + 1);
        //setMessageReadClicked(messageReadClicked + 1);
    };

    const setSearchTermHandler = (e) => {
        setSearchTerm(e.target.value);
        filterUserMessagesHandler();
    };

    const setSentFromProfileHandler = (profile) => {
        setSentFromProfile(profile);
    };

    const setSentFromUsernameHandler = (username) => {
        setSentFromUsername(username);
    };

    const fetchUserMessages = async () => {
        try {
            const { data } = await Api.get("/get_user_messages");
            if (data.success && !data.data[0]) {
                setInboxEmpty(true);
                setError("");
            } else {
                setUserMessages(data.data);
                setError("");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const filterUserMessagesHandler = () => {
        let filteredMessages = userMessages;

        filteredMessages = filteredMessages.filter((item) => {
            return (
                item.sent_from_username
                    .toLowerCase()
                    .search(searchTerm.toLowerCase()) !== -1
            );
        });
        setFilteredUserMessages(filteredMessages);
    };

    const fetchConversationMessages = async (id) => {
        try {
            const { data } = await Api.get(`/get_converstaion_messages/${id}`);
            if (data.success) {
                setError("");
                setConversationMessages(data.data);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <InboxMessagingContext.Provider
            value={{
                searchTerm: searchTerm,
                inboxEmpty: inboxEmpty,
                userMessages: userMessages,
                conversationMessages: conversationMessages,
                filteredUserMessages: filteredUserMessages,
                messageSentClicked: messageSentClicked,
                messageReadClicked: messageReadClicked,
                sentFromProfile: sentFromProfile,
                sentFromUsername: sentFromUsername,
                setSearchTermHandler: setSearchTermHandler,
                fetchUserMessages: fetchUserMessages,
                fetchConversationMessages: fetchConversationMessages,
                messageSentClickedHandler: messageSentClickedHandler,
                messageReadClickedHandler: messageReadClickedHandler,
                setSentFromProfileHandler: setSentFromProfileHandler,
                setSentFromUsernameHandler: setSentFromUsernameHandler,
            }}
        >
            {props.children}
        </InboxMessagingContext.Provider>
    );
};

export default InboxMessagingProvider;
