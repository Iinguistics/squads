import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Api from "../Api";

const Requests = withRouter(({ squad }) => {
    const appUrl = process.env.MIX_APP_URL;
    const requestIcon = `${appUrl}/images/adminPortal/request.png`;

    return (
        <div className="card admin-portal-card cursor-pointer mb-3 mb-md-0">
            <img src={requestIcon} className="card-img-top p-5" alt="request" />
            <div className="card-body">
                <h5 className="card-title">
                    Requests to Join {squad ? squad.squad_name : ""}
                </h5>
                <p className="card-text">
                    Reveiw requests, accept & add new teammates, or deny
                </p>
            </div>
        </div>
    );
});

export default Requests;
