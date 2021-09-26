import React from "react";
import Main from "./Main";
import Header from "./Header";

import UserProvider, { UserContext } from "./Context/UserContext";

const App = () => {
    return (
        <UserProvider>
            <UserContext.Consumer>
                {({
                    loggedInToggleHandler,
                    loggedInToggle,
                    passwordResetPinVerified,
                    passwordResetPinVerifiedHandler,
                }) => {
                    return (
                        <>
                            <Header
                                loggedInToggle={loggedInToggle}
                                loggedInToggleHandler={loggedInToggleHandler}
                            />
                            <main className="pt-5">
                                <Main
                                    loggedInToggleHandler={
                                        loggedInToggleHandler
                                    }
                                    passwordResetPinVerified={
                                        passwordResetPinVerified
                                    }
                                    passwordResetPinVerifiedHandler={
                                        passwordResetPinVerifiedHandler
                                    }
                                />
                            </main>
                        </>
                    );
                }}
            </UserContext.Consumer>
        </UserProvider>
    );
};

export default App;
