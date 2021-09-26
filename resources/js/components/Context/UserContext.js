import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = (props) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("userInfo"))
    );
    const [loggedInToggle, setLoggedInToggle] = useState(false);
    const [passwordResetPinVerified, setPasswordResetPinVerified] =
        useState(false);
    const [passwordResetEmail, setPasswordResetEmail] = useState("");

    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo !== user) {
            setUser(userInfo);
        }
    }, []);

    const loggedInToggleHandler = () => {
        setLoggedInToggle(!loggedInToggle);
    };

    const passwordResetPinVerifiedHandler = () => {
        setPasswordResetPinVerified(true);
    };

    const passwordResetEmailHandler = (e) => {
        setPasswordResetEmail(e);
    };

    return (
        <UserContext.Provider
            value={{
                user: user,
                loggedInToggle: loggedInToggle,
                passwordResetPinVerified: passwordResetPinVerified,
                passwordResetEmail,
                loggedInToggleHandler: loggedInToggleHandler,
                passwordResetPinVerifiedHandler:
                    passwordResetPinVerifiedHandler,
                passwordResetEmailHandler,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;
