import React, { useState, useEffect } from "react";

const BannerFontPreview = ({ fontColor, fontFamily, squad }) => {
    const renderBannerFontFamily = () => {
        if (fontFamily) {
            if (fontFamily === "corinthia") {
                return "banner-font-corinthia";
            }
            if (fontFamily === "major") {
                return "banner-font-major";
            }
            if (fontFamily === "smooch") {
                return "banner-font-smooch";
            }
            if (fontFamily === "vt323") {
                return "banner-font-vt323";
            }
        }
    };

    const renderBannerFontColor = () => {
        if (fontColor) {
            if (fontColor === "black") {
                return "appearance-font-color-black";
            }
            if (fontColor === "red") {
                return "appearance-font-color-red";
            }
            if (fontColor === "blue") {
                return "appearance-font-color-blue";
            }
            if (fontColor === "green") {
                return "appearance-font-color-green";
            }
            if (fontColor === "orange") {
                return "appearance-font-color-orange";
            }
            if (fontColor === "pink") {
                return "appearance-font-color-pink";
            }
            if (fontColor === "purple") {
                return "appearance-font-color-purple";
            }
        }
    };

    return (
        <div>
            <h1
                className={`banner-squad-name ${renderBannerFontFamily()} ${renderBannerFontColor()}`}
            >
                {squad ? squad.squad_name : ""}
            </h1>
        </div>
    );
};

export default BannerFontPreview;
