import React, { useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Moment from "react-moment";

import Home from "./Home";
import Inbox from "./Inbox";
import Login from "./Login";
import LoginHelp from "./Login/LoginHelp";
import PasswordReset from "./Login/LoginHelp/PasswordReset";
import PrivateProfile from "./PrivateProfile";
import PublicProfile from "./PublicProfile";
import Register from "./Register";

import Test from "./Test";
import TestTwo from "./TestTwo";

const Main = (props) => {
    return (
        <main>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/inbox" exact component={Inbox} />
                <Route
                    path="/login"
                    component={() => (
                        <Login
                            loggedInToggleHandler={props.loggedInToggleHandler}
                        />
                    )}
                />
                <Route path="/login-help" component={LoginHelp} />
                <Route
                    path="/password-reset"
                    component={() => (
                        <PasswordReset
                            passwordResetPinVerified={
                                props.passwordResetPinVerified
                            }
                            passwordResetPinVerifiedHandler={
                                props.passwordResetPinVerifiedHandler
                            }
                            passwordResetEmail={props.passwordResetEmail}
                            passwordResetEmailHandler={
                                props.passwordResetEmailHandler
                            }
                        />
                    )}
                />
                <Route path="/profile" exact component={PrivateProfile} />
                <Route path="/profile/:id" component={PublicProfile} />
                <Route path="/register" component={Register} />
                <Route path="/test" component={Test} />
            </Switch>
        </main>
    );
};

export default Main;
