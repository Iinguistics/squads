import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Api from "../../Api";

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
        const { data } = await Api.get("/logout");

        if (data.success) {
            localStorage.removeItem("userInfo");

            props.loggedInToggleHandler();
            handleClose();
            props.history.push("/");
        }
    };

    return (
        <div className="mt-5 text-center">
            <Container>
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
                            Sign Out
                        </button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
});

export default SendMessageModal;
