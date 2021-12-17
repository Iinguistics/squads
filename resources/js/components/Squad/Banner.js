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

    const renderBannerFontFamily = () => {
        if (squad) {
            if (squad.banner_font_family === "corinthia") {
                return "banner-font-corinthia";
            }
            if (squad.banner_font_family === "major") {
                return "banner-font-major";
            }
            if (squad.banner_font_family === "smooch") {
                return "banner-font-smooch";
            }
            if (squad.banner_font_family === "vt323") {
                return "banner-font-vt323";
            }
        }
    };

    const renderBannerFontColor = () => {
        if (squad) {
            if (squad.banner_font_color === "black") {
                return "appearance-font-color-black";
            }
            if (squad.banner_font_color === "red") {
                return "appearance-font-color-red";
            }
            if (squad.banner_font_color === "blue") {
                return "appearance-font-color-blue";
            }
            if (squad.banner_font_color === "green") {
                return "appearance-font-color-green";
            }
            if (squad.banner_font_color === "orange") {
                return "appearance-font-color-orange";
            }
            if (squad.banner_font_color === "pink") {
                return "appearance-font-color-pink";
            }
            if (squad.banner_font_color === "purple") {
                return "appearance-font-color-purple";
            }
        }
    };

    console.log(squad, "squad");

    return (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center banner-container">
            <div>
                <img
                    src={renderBannerPhotoOne()}
                    alt="photo"
                    className="banner-photo"
                />
            </div>
            <div>
                <h1
                    className={`banner-squad-name ${renderBannerFontFamily()} ${renderBannerFontColor()}`}
                >
                    {squad ? squad.squad_name : ""}
                </h1>
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
