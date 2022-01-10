import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Api from "../../Api";
import SuccessModal from "./SuccessModal";

const ViewRosterModal = withRouter((props) => {
    const appUrl = process.env.MIX_APP_URL;

    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.viewRosterClicked !== 0) {
            setShow(true);
        }
    }, [props.viewRosterClicked]);

    const handleClose = () => setShow(false);

    const successReset = () => {
        setSuccess(false);
    };

    const renderMemberLength = () => {
        if (props.squad.members.length === 1) {
            return <p>1 member</p>;
        } else {
            return <p>{props.squad.members.length} members</p>;
        }
    };

    const renderMemberPhoto = (member) => {
        const defaultPhoto = `${appUrl}/images/default-photo-black-outline.png`;
        if (member.user) {
            if (member.user.profile.photo) {
                return member.user.profile.photo;
            } else {
                return defaultPhoto;
            }
        }
    };

    const pushToCommenterProfile = (id) => {
        setShow(false);
        props.history.push(`/profile/${id}`);
    };

    const renderMembers = () => {
        if (props.squad) {
            return props.squad.members.map((member) => {
                return (
                    <div
                        className="d-flex flex-row align-items-center ml-1 mb-3 roster-member"
                        key={member.id}
                    >
                        <div className="item-1">
                            <img
                                src={renderMemberPhoto(member)}
                                alt="photo"
                                className="conversation-sidebar-photo mr-2 cursor-pointer"
                                onClick={() =>
                                    pushToCommenterProfile(member.id)
                                }
                            />
                        </div>
                        <div className="item-2">
                            <span
                                className="cursor-pointer"
                                onClick={() =>
                                    pushToCommenterProfile(member.id)
                                }
                            >
                                {member.user.username}
                            </span>
                        </div>
                    </div>
                );
            });
        }
    };

    console.log(props.squad, "new");
    return (
        <div className="mt-5 text-center">
            <Container>
                <SuccessModal
                    success={success}
                    titleText="Success"
                    bodyText="Request successfully sent"
                    buttonText="Got it"
                    successReset={successReset}
                />
                <Modal
                    show={show}
                    onHide={handleClose}
                    className="account-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {props.squad.squad_name} Roster
                            {renderMemberLength()}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{renderMembers()}</Modal.Body>
                    <Modal.Footer>
                        <button
                            onClick={handleClose}
                            className="bttn-material-flat bttn-sm mr-2"
                        >
                            Cancel
                        </button>
                        <button className="bttn-material-flat bttn-sm update-account-modal-btn">
                            Send
                        </button>
                        {error && <span className="text-danger">{error}</span>}
                    </Modal.Footer>
                </Modal>
                {loading && (
                    <div className="lds-hourglass d-flex justify-content-center m-auto"></div>
                )}
            </Container>
        </div>
    );
});

export default ViewRosterModal;
