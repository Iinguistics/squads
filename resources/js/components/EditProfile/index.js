import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import ProfileUpdateForm from "../Utils/Forms/ProfileUpdateForm";

const index = withRouter((props) => {
    // useEffect(() => {
    //     let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    //     if (!userInfo) {
    //         props.history.push("/login");
    //     }
    //     console.log(userInfo);
    // }, []);

    return (
        <div className="container my-5 main-header">
            <h1 className="text-center">Public profile</h1>
            <p className="text-center">Add information about yourself</p>
            <p className="text-center text-muted">
                <small>All inputs are optional, add what you wish.</small>
            </p>
            <ProfileUpdateForm />
        </div>
    );
});

export default index;
