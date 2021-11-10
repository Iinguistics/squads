import React, { useState } from "react";
import ImageCommentModal from "../Utils/Modals/ImageCommentModal";

const Images = ({ profileData, preview }) => {
    const [imageClicked, setImageClicked] = useState(0);
    const [imageDetails, setImageDetails] = useState({});

    const imageClickedHandler = (image) => {
        setImageClicked((imageClicked) => imageClicked + 1);
        setImageDetails(image);
    };

    const renderImages = () => {
        if (profileData) {
            if (profileData.user.images[0]) {
                return profileData.user.images.map((image) => {
                    return (
                        <div
                            key={image.image_id}
                            className="profile-img-container mb-2"
                            onClick={
                                !preview
                                    ? () => imageClickedHandler(image)
                                    : null
                            }
                        >
                            <img
                                src={image.image}
                                alt={
                                    image.description
                                        ? image.description
                                        : "image"
                                }
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
            } else {
                return (
                    <div className="m-auto">
                        <img
                            src={`${appUrl}/images/empty-2.png`}
                            alt="empty"
                            className="profile-preview-photo mr-2"
                        />
                        <span className="text-muted">No images uploaded</span>
                    </div>
                );
            }
        }
    };

    const appUrl = process.env.MIX_APP_URL;
    console.log(profileData);
    return (
        <div className="d-flex flex-col flex-md-row flex-wrap justify-content-center justify-content-md-between align-items-center shadow-sm p-3 mb-5 bg-white rounded text-center">
            {renderImages()}
            <ImageCommentModal
                imageClicked={imageClicked}
                imageDetails={imageDetails}
                profileData={profileData}
            />
        </div>
    );
};

Images.defaultProps = {
    preview: false,
};

export default Images;
