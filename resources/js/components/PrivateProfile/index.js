import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import ProfileSideBar from "./ProfileSideBar";

const index = withRouter((props) => {
    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo) {
            props.history.push("/login");
        }
        console.log(userInfo);
    }, []);
    return (
        <>
            <div className="d-flex flex-column flex-md-row">
                <ProfileSideBar />
                <div className="container mt-5 main-header">
                    <h1 className="text-center">Private Profile</h1>
                </div>
            </div>
        </>
    );
});

export default index;
