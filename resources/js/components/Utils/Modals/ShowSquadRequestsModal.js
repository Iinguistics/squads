import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { Modal, Container } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import Api from "../../Api";
import SuccessModal from "./SuccessModal";

const ShowSquadRequestsModal = withRouter((props) => {
    const appUrl = process.env.MIX_APP_URL;

    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [titleText, setTitleText] = useState("");
    const [bodyText, setBodyText] = useState("");

    const handleClose = () => setShow(false);

    useEffect(() => {
        if (props.showSquadInvitesClicked !== 0) {
            setShow(true);
        }
    }, [props.showSquadInvitesClicked]);

    const rejectInvite = async (id) => {
        try {
            setLoading(true);
            let value = {
                squad_invite_id: id,
            };
            const { data } = await Api.post("/reject_squad_invite", value);

            if (data.success) {
                setTitleText("Rejected");
                setBodyText("Invite has been rejected");
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

    const acceptInvite = async (inviteId, squadId) => {
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

    const renderSquadPhoto = (squad) => {
        const defaultPhoto = `${appUrl}/images/default-photo-black-outline.png`;
        if (squad.squad.photo) {
            return squad.squad.photo;
        } else {
            return defaultPhoto;
        }
    };

    const pushToSquadPreview = (id) => {
        setShow(false);
        props.history.push(`/squad/preview/${id}`);
    };

    const renderSquadInvites = () => {
        if (props.squadInvites) {
            if (props.squadInvites[0]) {
                return props.squadInvites.map((invite) => {
                    return (
                        <div
                            className="d-flex flex-row conversation-sidebar-username"
                            key={invite.squad_invite_id}
                        >
                            <div className="item-1">
                                <img
                                    src={renderSquadPhoto(invite)}
                                    alt="photo"
                                    className="conversation-sidebar-photo mr-2 image-comment-photo"
                                    onClick={() =>
                                        pushToSquadPreview(
                                            invite.squad.squad_id
                                        )
                                    }
                                />
                            </div>
                            <div className="item-2">
                                <span
                                    onClick={() =>
                                        pushToSquadPreview(
                                            invite.squad.squad_id
                                        )
                                    }
                                >
                                    {invite.squad.squad_name}
                                </span>{" "}
                                <span className="text-muted conversation-message-time">
                                    <Moment
                                        date={invite.created_at}
                                        format="MM/DD/YYYY hh:mm:a"
                                    />
                                </span>
                                <p>{invite.note ? invite.note : ""}</p>
                            </div>
                            <div className="item-3 ml-5">
                                <button
                                    onClick={() =>
                                        acceptInvite(
                                            invite.squad_invite_id,
                                            invite.squad_id
                                        )
                                    }
                                    className="bttn-material-flat bttn-sm bttn-primary mr-3 mb-3 mb-md-0"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() =>
                                        rejectInvite(invite.squad_invite_id)
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
                        <span className="text-muted">No Invites</span>
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
                        <Modal.Title>My Invites</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {renderSquadInvites()}
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

export default ShowSquadRequestsModal;
