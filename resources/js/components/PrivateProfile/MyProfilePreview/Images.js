import React from "react";

const Images = ({ profileData }) => {
    const renderImages = () => {
        if (profileData) {
            if (profileData.images) {
                return profileData.images.map((image) => {
                    return (
                        <div className="col-md-4 profile-img-container mb-2">
                            <img
                                src={image.image}
                                alt="profile image"
                                className="img-fluid profile-img"
                            />
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
