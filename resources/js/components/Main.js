import React, { useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Moment from "react-moment";

import Home from "./Home";
import Login from "./Login";
import LoginHelp from "./Login/LoginHelp";
import LogoutModal from "./Utils/Modals/LogoutModal";
import PrivateProfile from "./PrivateProfile";
import Register from "./Register";

const Main = (props) => {
    useEffect(() => {
        console.log(props);
    }, []);
    return (
        <main>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route
                    path="/login"
                    component={() => (
                        <Login
                            loggedInToggleHandler={props.loggedInToggleHandler}
                        />
                    )}
                />
                <Route path="/login-help" component={LoginHelp} />
                <Route path="/profile" component={PrivateProfile} />
                <Route
                    path="/test"
                    component={() => (
                        <LogoutModal
                            loggedInToggleHandler={props.loggedInToggleHandler}
                        />
                    )}
                />
                <Route path="/register" component={Register} />
            </Switch>
        </main>
    );
};

export default Main;
