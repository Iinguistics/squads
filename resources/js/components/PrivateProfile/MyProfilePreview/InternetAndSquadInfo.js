import React from "react";
import InternetInfo from "./InternetInfo";
import SquadInfo from "./SquadInfo";

const InternetAndSquadInfo = ({ profileData }) => {
    return (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 text-center">
            <div className="col-12 col-md-5 shadow-sm p-3 mb-5 bg-white rounded">
                <InternetInfo profileData={profileData} />
            </div>

            <div className="col-12 col-md-5 shadow-sm p-3 mb-5 bg-white rounded">
                <SquadInfo profileData={profileData} />
            </div>
        </div>
    );
};

export default InternetAndSquadInfo;
