import React, { useState, useEffect } from "react";

const Banner = ({ squad }) => {
    const appUrl = process.env.MIX_APP_URL;

    const renderBannerPhotoOne = () => {
        const defaultPhoto = `${appUrl}/images/default-photo-black-outline.png`;
        if (squad) {
            if (squad.banner_photo_one) {
                return squad.banner_photo_one;
            } else {
                return defaultPhoto;
            }
        }
    };

    const renderBannerPhotoTwo = () => {
        const defaultPhoto = `${appUrl}/images/default-photo-black-outline.png`;
        if (squad) {
            if (squad.banner_photo_two) {
                return squad.banner_photo_two;
            } else {
                return defaultPhoto;
            }
        }
    };
    console.log(squad, "squad");

    return (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5">
            <div>
                <img
                    src={renderBannerPhotoOne()}
                    alt="photo"
                    className="banner-photo"
                />
            </div>
            <div>
                <h1>{squad ? squad.squad_name : ""}</h1>
            </div>
            <div>
                <img
                    src={renderBannerPhotoTwo()}
                    alt="photo"
                    className="banner-photo"
                />
            </div>
        </div>
    );
};

export default Banner;
