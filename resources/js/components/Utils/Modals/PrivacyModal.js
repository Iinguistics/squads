import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Api from "../../Api";

const PrivacyModal = withRouter((props) => {
    const [show, setShow] = useState(false);
    const [sendMessageButton, setSendMessageButton] = useState(false);

    useEffect(() => {
        if (!props.profileViewable) {
            setShow(true);
        }
    }, [props.profileViewable]);

    const handleClose = () => setShow(false);

    const renderSendMessageButton = () => {
        if (props.profileData) {
            if (props.profileData.privacy_messaging === NONE) {
                setSendMessageButton(false);
            }

            if (
                props.profileData.privacy_messaging === NONE &&
                props.profileData.id !== userInfo.id
            ) {
                setprofileViewable(false);
            }
        }
    };

    return (
        <div className="mt-5 text-center">
            <Container>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign Out</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to sign out?</Modal.Body>
                    <Modal.Footer>
                        <button
                            onClick={handleClose}
                            className="bttn-material-flat bttn-sm mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            // onClick={logOutHandler}
                            className="bttn-material-flat bttn-sm update-account-modal-btn"
                        >
                            Sign Out
                        </button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
});

export default PrivacyModal;
