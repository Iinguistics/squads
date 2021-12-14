import React, { useState, useEffect } from "react";

const Banner = ({ squad }) => {
    const appUrl = process.env.MIX_APP_URL;

    const renderBannerPhotoOne = () => {
        const defaultPhoto = `${appUrl}/images/default-photo-black-outline.png`;
        if (squad.squad.banner_photo_one) {
            return squad.squad.banner_photo_one;
        } else {
            return defaultPhoto;
        }
    };

    const renderBannerPhotoTwo = () => {
        const defaultPhoto = `${appUrl}/images/default-photo-black-outline.png`;
        if (squad.squad.banner_photo_two) {
            return squad.squad.banner_photo_two;
        } else {
            return defaultPhoto;
        }
    };

    return (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5">
            <div>item 1</div>
            <div>item 2</div>
            <div>item 3</div>
        </div>
    );
};

export default Banner;
