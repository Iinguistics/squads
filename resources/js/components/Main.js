import React, { useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Moment from "react-moment";
import UserProvider, { UserContext } from "./Context/UserContext";

import Home from "./Home";
import Register from "./Register";
import PrivateProfile from "./PrivateProfile";
import LogoutModal from "./Utils/Modals/LogoutModal";

const Main = (props) => {
    useEffect(() => {
        console.log(props);
    }, []);
    return (
        <UserProvider>
            <UserContext.Consumer>
                {({ user }) => {
                    return (
                        <main>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/register" component={Register} />
                                <Route
                                    path="/profile"
                                    component={PrivateProfile}
                                />
                                <Route
                                    exact
                                    path="/test"
                                    component={LogoutModal}
                                />
                            </Switch>
                        </main>
                    );
                }}
            </UserContext.Consumer>
        </UserProvider>
    );
};

export default Main;
