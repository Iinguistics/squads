import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import PasswordResetForm from "../../../Utils/Forms/PasswordResetForm";

const index = withRouter((props) => {
    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            props.history.push("/profile");
        }
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center">Reset Password</h1>
            <PasswordResetForm />
        </div>
    );
});

export default index;
