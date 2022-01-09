import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Api from "../../Api";
import SuccessModal from "./SuccessModal";

const ViewRosterModal = withRouter((props) => {
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.requestClicked !== 0) {
            setShow(true);
        }
    }, [props.requestClicked]);

    const handleClose = () => setShow(false);

    const successReset = () => {
        setSuccess(false);
    };

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
                            {props.squad ? props.squad.squad_name : ""} Roster
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {error && <span className="text-danger">{error}</span>}
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            onClick={handleClose}
                            className="bttn-material-flat bttn-sm mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={createSquadRequestHandler}
                            className="bttn-material-flat bttn-sm update-account-modal-btn"
                        >
                            Send
                        </button>
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
