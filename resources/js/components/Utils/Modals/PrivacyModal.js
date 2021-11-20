import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Api from "../../Api";

const PrivacyModal = withRouter((props) => {
    const [show, setShow] = useState(false);
    const [sendMessageButton, setSendMessageButton] = useState(false);

    useEffect(() => {
        if (!props.profileMessagable) {
            setShow(true);
        }
    }, [props.profileMessagable]);

    const handleClose = () => setShow(false);

    return (
        <div className="mt-5 text-center">
            <Container>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Message</Modal.Title>
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
