import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = (props) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("userInfo"))
    );

    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo !== user) {
            setUser(userInfo);
        }
    }, []);
    return (
        <UserContext.Provider
            value={{
                user: user,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;
