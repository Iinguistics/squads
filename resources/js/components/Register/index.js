import React, { useEffect } from "react";
import SignUpAndUpdateForm from "../Utils/Forms/SignUpAndUpdateForm";
import { withRouter } from "react-router-dom";

const index = withRouter((props) => {
    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            props.history.push("/profile");
        }
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center">Create your account</h1>
            <SignUpAndUpdateForm />
        </div>
    );
});

export default index;
