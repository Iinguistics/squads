import React from "react";
import { withRouter } from "react-router-dom";
import { Modal, Container } from "react-bootstrap";
import "../../../../css/bttn/bttn.min.css";

const SuccessModal = withRouter((props) => {
    const handleClose = () => {
        if (props.push) {
            props.history.push(`/${props.push}`);
        }
    };

    return (
        <Container>
            <Modal show={props.success} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.titleText}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-white">
                    {props.bodyText}
                </Modal.Body>
                <Modal.Footer className="m-auto">
                    <button
                        onClick={handleClose}
                        className="bttn-pill bttn-sm bttn-primary bg-dark"
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
