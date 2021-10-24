import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Head from "./Head";
import InternetAndSquadInfo from "./InternetAndSquadInfo";
import Images from "./Images";

const index = ({ profileData, profileColor, fetchProfileHandler }) => {
    useEffect(() => {
        fetchProfileHandler();
    }, []);
    return (
        <div className="container">
            <h2 className="text-center">Profile Preview</h2>
            <p className="text-center text-muted">
                Some features are disabled in preview mode
            </p>
            <div className="text-center mb-5">
                <Link
                    to={profileData ? `/profile/${profileData.user.id}` : "/"}
                    className="text-muted"
                >
                    View my public profile
                </Link>
            </div>
            <Head profileData={profileData} profileColor={profileColor} />
            <InternetAndSquadInfo profileData={profileData} />
            <Images profileData={profileData} preview={true} />
        </div>
    );
};

export default index;
