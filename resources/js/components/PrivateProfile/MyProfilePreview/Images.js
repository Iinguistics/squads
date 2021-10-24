import React, { useState } from "react";
import ImageCommentModal from "../../Utils/Modals/ImageCommentModal";

const Images = ({ profileData, preview }) => {
    const [imageClicked, setImageClicked] = useState(0);

    const imageClickedHandler = () => {
        setImageClicked((imageClicked) => imageClicked + 1);
    };

    const renderImages = () => {
        if (profileData) {
            if (profileData.images) {
                return profileData.images.map((image) => {
                    return (
                        <div
                            className="profile-img-container mb-2"
                            onClick={!preview ? imageClickedHandler : null}
                        >
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

    const appUrl = process.env.MIX_APP_URL;

    return (
        <div className="d-flex flex-col flex-md-row flex-wrap justify-content-between align-items-center shadow-sm p-3 mb-5 bg-white rounded text-center">
            {renderImages()}
            <ImageCommentModal imageClicked={imageClicked} />
        </div>
    );
};

Images.defaultProps = {
    preview: false,
};

export default Images;
