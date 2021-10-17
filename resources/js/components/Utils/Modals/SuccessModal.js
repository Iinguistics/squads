import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Modal, Container } from "react-bootstrap";
import "../../../../css/bttn/bttn.min.css";

const SuccessModal = withRouter((props) => {
    const [show, setShow] = useState(props.success);

    useEffect(() => {
        setShow(props.success);
    }, [props.success]);

    const handleClose = () => {
        if (props.push) {
            props.successReset ? props.successReset() : setShow(false);
            props.history.push(`${props.push}`);
        } else if (props.tab) {
            props.successReset ? props.successReset() : setShow(false);
            props.tabHandler(props.tab);
        } else {
            props.successReset ? props.successReset() : setShow(false);
        }
    };

    return (
        <Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.titleText}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.bodyText}</Modal.Body>
                <Modal.Footer className="m-auto">
                    <button
                        onClick={handleClose}
                        className="bttn-material-flat bttn-sm update-account-modal-btn"
                    >
                        {props.buttonText}
                    </button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
});

SuccessModal.defaultProps = {
    success: false,
    push: null,
    titleText: "Title",
    bodyText: "Body",
    buttonText: "Close",
};

export default SuccessModal;
