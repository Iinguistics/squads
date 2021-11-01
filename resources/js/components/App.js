import React from "react";
import Main from "./Main";
import Header from "./Header";

import UserProvider, { UserContext } from "./Context/UserContext";
import InboxMessagingProvider, {
    InboxMessagingContext,
} from "./Context/InboxMessagingContext";

const App = () => {
    return (
        <UserProvider>
            <UserContext.Consumer>
                {({
                    loggedInToggleHandler,
                    loggedInToggle,
                    passwordResetPinVerified,
                    passwordResetPinVerifiedHandler,
                    passwordResetEmail,
                    passwordResetEmailHandler,
                }) => {
                    return (
                        <>
                            <Header
                                loggedInToggle={loggedInToggle}
                                loggedInToggleHandler={loggedInToggleHandler}
                            />
                            <main>
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
                                    passwordResetEmail={passwordResetEmail}
                                    passwordResetEmailHandler={
                                        passwordResetEmailHandler
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
