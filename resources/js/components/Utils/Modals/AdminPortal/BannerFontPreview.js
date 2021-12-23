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

    return (
        <div>
            <h1 className={`banner-squad-name ${renderBannerFontFamily()} `}>
                {squad ? squad.squad_name : ""}
            </h1>
        </div>
    );
};

export default BannerFontPreview;
