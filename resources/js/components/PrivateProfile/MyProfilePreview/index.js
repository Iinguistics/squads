import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Head from "../../ProfileComponents/Head";
import InternetAndSquadInfo from "../../ProfileComponents/InternetAndSquadInfo";
import Images from "../../ProfileComponents/Images";

const index = ({ profileData, profileColor, fetchPrivateProfileHandler }) => {
    useEffect(() => {
        fetchPrivateProfileHandler();
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
            <Head
                profileData={profileData}
                profileColor={profileColor}
                preview={true}
            />
            <InternetAndSquadInfo profileData={profileData} />
            <Images profileData={profileData} preview={true} />
        </div>
    );
};

export default index;
