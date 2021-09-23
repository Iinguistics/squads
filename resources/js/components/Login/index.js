import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import LoginForm from "../Utils/Forms/LoginForm";

const index = withRouter((props) => {
    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            props.history.push("/profile");
        }
        console.log(userInfo);
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center">Sign into Squads</h1>
            <LoginForm loggedInToggleHandler={props.loggedInToggleHandler} />
        </div>
    );
});

export default index;
