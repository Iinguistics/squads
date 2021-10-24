import React from "react";

const Images = ({ profileData }) => {
    const appUrl = process.env.MIX_APP_URL;

    const renderImages = () => {
        if (profileData) {
            if (profileData.images) {
                return profileData.images.map((image) => {
                    return (
                        <div className="profile-img-container mb-2">
                            <img
                                src={image.image}
                                alt="profile image"
                                className="img-fluid profile-img"
                            />
                            <img
                                src={`${appUrl}/images/comment-gradient.png`}
                                alt="comment"
                                className="profile-img-comment-icon"
                            />
                            <div className="profile-img-overlay"></div>
                        </div>
                    );
                });
            }
        }
    };
    return (
        <div className="d-flex flex-col flex-md-row flex-wrap justify-content-between align-items-center shadow-sm p-3 mb-5 bg-white rounded text-center">
            {renderImages()}
        </div>
    );
};

export default Images;
