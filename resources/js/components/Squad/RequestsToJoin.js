import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Api from "../Api";

const RequestsToJoin = () => {
    const [pendingRequests, setPendingRequests] = useState(false);
    const [showSquadRequestsClicked, setShowSquadRequestsClicked] = useState(0);

    const fetchSquadRequestsHandler = async () => {
        const { data } = await Api.get(
            `/fetch_squad_requests/${props.match.params.id}`
        );
        setPendingRequests(data.data);
    };

    useEffect(() => {
        fetchSquadRequestsHandler();
    }, []);

    const renderPendingInvitesNotification = () => {
        if (pendingRequests) {
            return (
                <div className="pending-squad-invite-notification-bubble"></div>
            );
        }
    };

    const showSquadRequestsClickedHandler = () => {
        setShowSquadRequestsClicked(
            (showSquadRequestsClicked) => showSquadRequestsClicked + 1
        );
    };

    return (
        <div>
            <button
                className="item-3 mb-5 mb-md-0 squad-invites-container bttn-material-flat bttn-sm"
                onClick={showSquadRequestsClickedHandler}
            >
                Requests {renderPendingInvitesNotification()}
            </button>
        </div>
    );
};

export default RequestsToJoin;
