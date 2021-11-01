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
                        <InboxMessagingProvider>
                            <InboxMessagingContext.Consumer>
                                {({
                                    messageSentClicked,
                                    messageReadClicked,
                                }) => {
                                    return (
                                        <>
                                            <Header
                                                loggedInToggle={loggedInToggle}
                                                loggedInToggleHandler={
                                                    loggedInToggleHandler
                                                }
                                                messageReadClicked={
                                                    messageReadClicked
                                                }
                                                messageSentClicked={
                                                    messageSentClicked
                                                }
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
                                                    passwordResetEmail={
                                                        passwordResetEmail
                                                    }
                                                    passwordResetEmailHandler={
                                                        passwordResetEmailHandler
                                                    }
                                                />
                                            </main>
                                        </>
                                    );
                                }}
                            </InboxMessagingContext.Consumer>
                        </InboxMessagingProvider>
                    );
                }}
            </UserContext.Consumer>
        </UserProvider>
    );
};

export default App;
