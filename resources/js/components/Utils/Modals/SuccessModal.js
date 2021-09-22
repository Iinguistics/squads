import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Modal, Button, Container } from "react-bootstrap";
import "../../../../css/bttn/bttn.min.css";

const SuccessModal = withRouter((props) => {
    const [show, setShow] = useState(props.success);

    const handleClose = () => {
        setShow(false);
        if (props.push) {
            props.history.push(`/${props.push}`);
        }
    };

    return (
        <div className="mt-5 text-center">
            <Container>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{props.titleText}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-dark text-white">
                        {props.bodyText}
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            onClick={handleClose}
                            className="bttn-pill bttn-md bttn-primary"
                        >
                            {props.buttonText}
                        </button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
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
