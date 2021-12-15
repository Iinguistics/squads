import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Api from "../Api";

const BannerFontFamily = withRouter(() => {
    const appUrl = process.env.MIX_APP_URL;
    const fontIcon = `${appUrl}/images/adminPortal/font.png`;

    return (
        <div className="card squad-card my-4 cursor-pointer">
            <img src={requestIcon} className="card-img-top p-5" alt="request" />
            <div className="card-body">
                <h5 className="card-title">
                    {squad ? squad.squad_name : ""} banner font
                </h5>
                <p className="card-text">
                    Update the font family of your squads banner
                </p>
            </div>
        </div>
    );
});

export default BannerFontFamily;
