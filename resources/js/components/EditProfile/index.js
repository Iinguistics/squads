import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import ProfileUpdateForm from "../Utils/Forms/ProfileUpdateForm";

const index = withRouter((props) => {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        let userInfoData = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfoData) {
            props.history.push("/login");
        }
        setUserInfo(userInfoData);

    }, []);
    console.log(userInfo);

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
