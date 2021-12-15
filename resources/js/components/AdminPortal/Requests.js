import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Api from "../Api";

const Requests = withRouter(() => {
    const appUrl = process.env.MIX_APP_URL;

    const requestIcon = `${appUrl}/images/adminPortal/request.png`;

    return (
        <div className="card squad-card my-4 my-md-0 cursor-pointer">
            <img src={requestIcon} className="card-img-top p-5" alt="request" />
            <div className="card-body">
                <h5 className="card-title">testing</h5>
                <p className="card-text">testing</p>
            </div>
        </div>
    );
});

export default Requests;
