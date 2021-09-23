import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = (props) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("userInfo"))
    );
    const [loggedInToggle, setLoggedInToggle] = useState(false);

    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo !== user) {
            setUser(userInfo);
        }
    }, []);

    const loggedInToggleHandler = () => {
        setLoggedInToggle(!loggedInToggle);
    };

    return (
        <UserContext.Provider
            value={{
                user: user,
                loggedInToggleHandler: loggedInToggleHandler,
                loggedInToggle: loggedInToggle,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;
