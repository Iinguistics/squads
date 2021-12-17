import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Api from "../Api";
import BannerFontModal from "../Utils/Modals/AdminPortal/BannerFontModal";

const BannerFontFamily = withRouter(({ squad }) => {
    const appUrl = process.env.MIX_APP_URL;
    const fontIcon = `${appUrl}/images/adminPortal/font.png`;

    const [bannerFontFamilyClicked, setBannerFontFamilyClicked] = useState(0);

    const bannerFontFamilyClickedHandler = () => {
        setBannerFontFamilyClicked(
            (bannerFontFamilyClicked) => bannerFontFamilyClicked + 1
        );
    };

    return (
        <>
            <div
                className="card admin-portal-card cursor-pointer mb-3 mb-md-0"
                onClick={bannerFontFamilyClickedHandler}
            >
                <img src={fontIcon} className="card-img-top p-5" alt="font" />
                <div className="card-body">
                    <h5 className="card-title">
                        {squad ? squad.squad_name : ""} banner
                    </h5>
                    <p className="card-text">
                        Update the font family & color of your squads banner
                    </p>
                </div>
            </div>

            <BannerFontModal
                bannerFontFamilyClicked={bannerFontFamilyClicked}
                squad={squad}
            />
        </>
    );
});

export default BannerFontFamily;
