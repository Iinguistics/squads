import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

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
            <h1 className="text-center">Login Page</h1>
        </div>
    );
});

export default index;
