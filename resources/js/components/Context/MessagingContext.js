import React, { createContext, useState } from "react";
import Api from "../Api";

export const MessagingContext = createContext();

const MessagingProvider = (props) => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const [userMessages, setUserMessages] = useState(null);
    const [sentFromMessages, setSentFromMessages] = useState(null);

    const fetchUserMessages = async () => {
        try {
            const { data } = await Api.get("/get_user_messages");
            if (data.data[0]) {
                setUserMessages(data.data[0]);
            } else {
                return;
            }
        } catch (error) {
            return;
        }
    };

    return (
        <MessagingContext.Provider
            value={{
                test: test,
            }}
        >
            {props.children}
        </MessagingContext.Provider>
    );
};

export default MessagingProvider;
