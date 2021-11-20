import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const PrivacyModal = withRouter((props) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (props.activatePrivacyModal !== 0) {
            setShow(true);
        }
    }, [props.activatePrivacyModal]);

    const handleClose = () => setShow(false);

    return (
        <div className="mt-5 text-center">
            <Container>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{props.privacyModalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{props.privacyModalBody}</Modal.Body>
                    <Modal.Footer>
                        <button
                            onClick={handleClose}
                            className="bttn-material-flat bttn-sm update-account-modal-btn"
                        >
                            Got it
                        </button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
});

export default PrivacyModal;
