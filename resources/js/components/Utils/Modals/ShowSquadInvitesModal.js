import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { Modal, Container } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import Api from "../../Api";

const ShowSquadInvitesModal = withRouter((props) => {
    const appUrl = process.env.MIX_APP_URL;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    useEffect(() => {
        if (props.showSquadInvitesClicked !== 0) {
            setShow(true);
        }
    }, [props.showSquadInvitesClicked]);

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
            return props.squadInvites.map((invite) => {
                return (
                    <div
                        className="d-flex flex-row "
                        key={invite.squad_invite_id}
                    >
                        <div className="item-1">
                            <img
                                src={renderSquadPhoto(invite)}
                                alt="photo"
                                className="conversation-sidebar-photo mr-2 image-comment-photo"
                                onClick={() =>
                                    pushToSquadPreview(invite.squad.squad_id)
                                }
                            />
                        </div>
                        <div className="item-2">
                            <span>{invite.squad.squad_name}</span>{" "}
                            <span className="text-muted conversation-message-time">
                                <Moment
                                    date={invite.created_at}
                                    format="MM/DD/YYYY hh:mm:a"
                                />
                            </span>
                            <p>{invite.note ? invite.note : ""}</p>
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
    };

    return (
        <div className="mt-5 text-center">
            <Container>
                <Modal show={show} onHide={handleClose} size="md">
                    <Modal.Header closeButton>
                        <Modal.Title>My Invites</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>{renderSquadInvites()}</div>
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

export default ShowSquadInvitesModal;
