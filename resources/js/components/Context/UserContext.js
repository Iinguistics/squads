import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = (props) => {
    const [user, setUser] = useState(localStorage.getItem("user"));

    useEffect(() => {
        let userInfo = localStorage.getItem("user");
        if (userInfo !== user) {
            setUser(userInfo);
        }
    }, []);
    return (
        <UserContext.Provider
            value={{
                user: JSON.parse(user),
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;
