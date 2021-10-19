import React, { useEffect } from "react";
import ProfileColor from "../ProfileColor";
import Head from "./Head";

const index = ({
    userInfo,
    profileData,
    profileColor,
    fetchProfileHandler,
}) => {
    useEffect(() => {
        fetchProfileHandler();
    }, []);
    return (
        <div className="container text-center">
            <h2 className="mb-5">Profile Preview</h2>
            <Head
                userInfo={userInfo}
                profileData={profileData}
                profileColor={profileColor}
            />
        </div>
    );
};

export default index;
