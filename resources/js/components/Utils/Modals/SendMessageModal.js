import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Api from "../../Api";
import SuccessModal from "./SuccessModal";

const SendMessageModal = withRouter((props) => {
    const [show, setShow] = useState(false);
    const [body, setBody] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (props.sendMessageClicked !== 0) {
            setShow(true);
        }
    }, [props.sendMessageClicked]);

    const handleClose = () => setShow(false);

    const sendMessageHandler = async () => {
        try {
            let values = {
                id: props.profileData.id,
                body: body,
            };
            const { data } = await Api.post("/send_user_message", values);

            if (data.success) {
                setSuccess(true);
                setError(false);
                setShow(false);
            } else {
                setSuccess(false);
                setError(data.error);
            }
        } catch (error) {
            setError(error.message);
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
                    bodyText="Message sent."
                    buttonText="Got it"
                    successReset={successReset}
                />
                <Modal show={show} onHide={handleClose} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>New Message</Modal.Title>
                    </Modal.Header>
                    <form
                        // encType="multipart/form-data"
                        onSubmit={sendMessageHandler}
                    >
                        <Modal.Body>
                            <span>
                                To:{" "}
                                {props.profileData
                                    ? props.profileData.user.username
                                    : ""}
                            </span>
                            <br />
                            <textarea
                                className="mt-2"
                                name="body"
                                id="body"
                                rows="4"
                                cols="33"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            />
                            {error && (
                                <span className="text-danger">{error}</span>
                            )}
                        </Modal.Body>
                    </form>
                    <Modal.Footer>
                        <button
                            onClick={handleClose}
                            className="bttn-material-flat bttn-sm mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={sendMessageHandler}
                            className="bttn-material-flat bttn-sm update-account-modal-btn"
                        >
                            Send Message
                        </button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
});

export default SendMessageModal;
