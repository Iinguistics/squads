import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Api from "../../Api";
import SuccessModal from "./SuccessModal";

const RequestToJoinModal = withRouter((props) => {
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [note, setNote] = useState("");

    useEffect(() => {
        if (props.requestClicked !== 0) {
            setShow(true);
        }
    }, [props.requestClicked]);

    const handleClose = () => setShow(false);

    const createSquadRequestHandler = async (e) => {
        e.preventDefault();

        if (note.length > 299) {
            setError("Note cannot be more than 300 characters");
            return;
        }

        try {
            setLoading(true);
            let values = {
                squad_id: props.squad.squad_id,
                note: note,
            };
            const { data } = await Api.post("/create_squad_request", values);

            if (data.success) {
                setSuccess(true);
                setError("");
                setShow(false);
                setLoading(false);
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
                            Send Request to Join{" "}
                            {props.squad ? props.squad.squad_name : ""}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={createSquadRequestHandler}>
                            <label htmlFor="note">Send Note</label>{" "}
                            <span className="text-muted">(Optional)</span>
                            <br />
                            <textarea
                                name="note"
                                id="note"
                                placeholder="I have map awarness & spawn knowledge. Check my stats, I would be a valuable asset..."
                                rows="4"
                                cols="33"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </form>
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

export default RequestToJoinModal;
