import React, { createContext, useState } from "react";
import Api from "../Api";

export const MessagingContext = createContext();

const MessagingProvider = (props) => {
    const [test, setTest] = useState("test");
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
