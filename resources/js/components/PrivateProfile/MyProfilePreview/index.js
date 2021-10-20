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
        <div className="container">
            <h2 className="mb-5 text-center">Profile Preview</h2>
            <Head
                userInfo={userInfo}
                profileData={profileData}
                profileColor={profileColor}
            />
        </div>
    );
};

export default index;
