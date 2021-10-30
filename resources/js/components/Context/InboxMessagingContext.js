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
    const [sentFromMessages, setSentFromMessages] = useState(null);

    const fetchUserMessages = async () => {
        try {
            const { data } = await Api.get("/get_user_messages");
            if (data.success && !data.data[0]) {
                setInboxEmpty(true);
                setError("");
            } else {
                setUserMessages(data.data[0]);
                setError("");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const test = async () => {
        try {
            const { data } = await Api.get("/get_converstaion_messages/12");
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

    return (
        <InboxMessagingContext.Provider
            value={{
                inboxEmpty: inboxEmpty,
                userMessages: userMessages,
                fetchUserMessages: fetchUserMessages,
                test: test,
            }}
        >
            {props.children}
        </InboxMessagingContext.Provider>
    );
};

export default InboxMessagingProvider;
