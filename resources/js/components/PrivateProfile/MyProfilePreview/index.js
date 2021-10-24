import React, { useEffect } from "react";
import Head from "./Head";
import InternetAndSquadInfo from "./InternetAndSquadInfo";
import Images from "./Images";

const index = ({ profileData, profileColor, fetchProfileHandler }) => {
    useEffect(() => {
        fetchProfileHandler();
    }, []);
    return (
        <div className="container">
            <h2 className="mb-5 text-center">Profile Preview</h2>
            <Head profileData={profileData} profileColor={profileColor} />
            <InternetAndSquadInfo profileData={profileData} />
            <Images profileData={profileData} />
        </div>
    );
};

export default index;
