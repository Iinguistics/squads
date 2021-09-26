import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import PasswordResetRequestForm from "../../../Utils/Forms/PasswordResetRequestForm";

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
            <PasswordResetRequestForm
                passwordResetPinVerified={props.passwordResetPinVerified}
                passwordResetPinVerifiedHandler={
                    props.passwordResetPinVerifiedHandler
                }
            />
        </div>
    );
});

export default index;
