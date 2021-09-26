import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import PasswordResetRequestForm from "../../../Utils/Forms/PasswordResetRequestForm";
import PasswordResetUpdateForm from "../../../Utils/Forms/PasswordResetUpdateForm";

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
            {!props.passwordResetPinVerified ? (
                <PasswordResetRequestForm
                    passwordResetPinVerifiedHandler={
                        props.passwordResetPinVerifiedHandler
                    }
                    passwordResetEmailHandler={props.passwordResetEmailHandler}
                />
            ) : (
                <PasswordResetUpdateForm
                    passwordResetEmail={props.passwordResetEmail}
                />
            )}
        </div>
    );
});

export default index;
