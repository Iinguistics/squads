import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import RequestsToJoinModal from "../Utils/Modals/AdminPortal/RequestsToJoinModal";

const Requests = withRouter(({ squad }) => {
    const appUrl = process.env.MIX_APP_URL;
    const requestIcon = `${appUrl}/images/adminPortal/request.png`;

    const [requestsToJoinClicked, setRequestsToJoinClicked] = useState(0);

    const requestsToJoinClickedHandler = () => {
        setRequestsToJoinClicked(
            (requestsToJoinClicked) => requestsToJoinClicked + 1
        );
    };

    return (
        <>
            <div
                className="card admin-portal-card cursor-pointer mb-3 mb-md-0"
                onClick={requestsToJoinClickedHandler}
            >
                <img
                    src={requestIcon}
                    className="card-img-top p-5"
                    alt="request"
                />
                <div className="card-body">
                    <h5 className="card-title">
                        Requests to Join {squad ? squad.squad_name : ""}
                    </h5>
                    <p className="card-text">
                        Reveiw requests, accept & add new teammates, or deny
                    </p>
                </div>
            </div>
            <RequestsToJoinModal
                requestsToJoinClicked={requestsToJoinClicked}
                squad={squad}
            />
        </>
    );
});

export default Requests;
