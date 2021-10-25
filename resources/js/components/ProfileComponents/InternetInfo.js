import React from "react";

const InternetInfo = ({ profileData }) => {
    const appUrl = process.env.MIX_APP_URL;
    const noInfo = "Not available";

    const checkInternetInfo = () => {
        if (profileData) {
            if (
                !profileData.carrier &&
                !profileData.ping &&
                !profileData.download_speed &&
                !profileData.upload_speed
            ) {
                return (
                    <div>
                        <p className="text-muted">
                            Info has not yet been provided
                        </p>
                        <img
                            src={`${appUrl}/images/empty.png`}
                            alt="empty"
                            className="profile-preview-photo"
                        />
                    </div>
                );
            } else {
                return (
                    <>
                        <span className="col-6">
                            Carrier:{" "}
                            {profileData.carrier ? profileData.carrier : noInfo}
                        </span>
                        <span className="col-6">
                            Ping: {profileData.ping ? profileData.ping : noInfo}
                        </span>
                        <span className="col-6">
                            Download speed:{" "}
                            {profileData.download_speed
                                ? profileData.download_speed
                                : noInfo}
                        </span>
                        <span className="col-6">
                            Upload speed:{" "}
                            {profileData.upload_speed
                                ? profileData.upload_speed
                                : noInfo}
                        </span>
                    </>
                );
            }
        } else {
            return null;
        }
    };
    return (
        <>
            <h5 className="text-center">Internet Info</h5>
            <div className="d-flex flex-wrap justify-content-around align-items-center text-center">
                {checkInternetInfo()}
            </div>
        </>
    );
};

export default InternetInfo;
