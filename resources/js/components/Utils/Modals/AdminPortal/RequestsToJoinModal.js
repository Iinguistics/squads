import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { Modal, Container } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import Api from "../../../Api";
import SuccessModal from "../SuccessModal";

const RequestsToJoinModal = withRouter((props) => {
    const appUrl = process.env.MIX_APP_URL;

    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [titleText, setTitleText] = useState("");
    const [bodyText, setBodyText] = useState("");

    const handleClose = () => setShow(false);

    useEffect(() => {
        if (props.requestsToJoinClicked !== 0) {
            setShow(true);
        }
    }, [props.requestsToJoinClicked]);

    const rejectRequest = async (id) => {
        try {
            setLoading(true);
            let value = {
                squad_request_id: id,
            };
            const { data } = await Api.post("/reject_squad_request", value);

            if (data.success) {
                setTitleText("Rejected");
                setBodyText("Request has been rejected");
                setSuccess(true);
                setError(false);
                setShow(false);
                setLoading(false);
                //props.fetchSquadInvitesHandler();
            } else {
                setSuccess(false);
                setError(data.error);
                setLoading(false);
            }
        } catch (error) {
            setError(error.message);
            setSuccess(false);
            setLoading(false);
        }
    };

    const acceptRequest = async (requestId, userId) => {
        try {
            setLoading(true);
            let values = {
                squad_invite_id: inviteId,
                squad_id: squadId,
            };
            const { data } = await Api.post("/accept_squad_invite", values);

            if (data.success) {
                setTitleText("Accepted");
                setBodyText("Invite has been accepted");
                setSuccess(true);
                setError(false);
                setShow(false);
                setLoading(false);
                props.fetchSquadInvitesHandler();
            } else {
                setSuccess(false);
                setError(data.error);
                setLoading(false);
            }
        } catch (error) {
            setError(error.message);
            setSuccess(false);
            setLoading(false);
        }
    };

    const renderUserPhoto = (request) => {
        const defaultPhoto = `${appUrl}/images/default-photo-black-outline.png`;
        if (request.user.profile.photo) {
            return request.user.profile.photo;
        } else {
            return defaultPhoto;
        }
    };

    const pushToUserProfile = (id) => {
        setShow(false);
        props.history.push(`/profile/${id}`);
    };

    const renderSquadRequests = () => {
        if (props.squad) {
            if (props.squad.requests) {
                return props.squad.requests.map((request) => {
                    return (
                        <div
                            className="d-flex flex-row conversation-sidebar-username"
                            key={request.squad_request_id}
                        >
                            <div className="item-1">
                                <img
                                    src={renderUserPhoto(request)}
                                    alt="photo"
                                    className="conversation-sidebar-photo mr-2 image-comment-photo"
                                    onClick={() =>
                                        pushToUserProfile(request.user.id)
                                    }
                                />
                            </div>
                            <div className="item-2">
                                <span
                                    onClick={() =>
                                        pushToUserProfile(request.user.id)
                                    }
                                >
                                    {request.user.username}
                                </span>{" "}
                                <span className="text-muted conversation-message-time">
                                    <Moment
                                        date={request.created_at}
                                        format="MM/DD/YYYY hh:mm:a"
                                    />
                                </span>
                                <p>{request.note ? request.note : ""}</p>
                            </div>
                            <div className="item-3 ml-5">
                                <button
                                    onClick={() =>
                                        acceptRequest(
                                            request.squad_request_id,
                                            request.user.id
                                        )
                                    }
                                    className="bttn-material-flat bttn-sm bttn-primary mr-3 mb-3 mb-md-0"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() =>
                                        rejectRequest(request.squad_request_id)
                                    }
                                    className="bttn-material-flat bttn-sm bttn-danger"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    );
                });
            } else {
                return (
                    <div>
                        <span className="text-muted">No Requests</span>
                    </div>
                );
            }
        }
    };

    const successReset = () => {
        setSuccess(false);
    };

    return (
        <div className="mt-5 text-center">
            <Container>
                <SuccessModal
                    success={success}
                    titleText={titleText}
                    bodyText={bodyText}
                    buttonText="Got it"
                    successReset={successReset}
                />
                <Modal show={show} onHide={handleClose} size="md">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Requests To Join{" "}
                            {props.squad ? props.squad.squad_name : ""}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {renderSquadRequests()}
                        {error && <span className="text-danger">{error}</span>}
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            onClick={handleClose}
                            className="bttn-material-flat bttn-sm mr-2"
                        >
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
});

export default RequestsToJoinModal;
