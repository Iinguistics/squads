import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import LoginForm from "../Utils/Forms/Login/LoginForm";

const index = withRouter((props) => {
    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            props.history.push("/profile");
        }
    }, []);

    return (
        <div className="container my-5 main-header">
            <h1 className="text-center">Sign into Squads</h1>
            <LoginForm loggedInToggleHandler={props.loggedInToggleHandler} />
        </div>
    );
});

export default index;
