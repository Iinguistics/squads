import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Api from "../../../Api";
import SuccessModal from "../SuccessModal";

const UsernameModal = withRouter((props) => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        if (props.usernameClicked !== 0) {
            setShow(true);
        }
    }, [props.usernameClicked]);

    const handleClose = () => {
        setShow(false);
    };

    const fetchProfileHandler = async () => {
        try {
            const { data } = await Api.get("/current_user");
            if (data) {
                setUsername(data.username);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchProfileHandler();
    }, []);

    const successReset = () => {
        setSuccess(false);
    };

    const updateAccountHandler = async () => {
        if (username === "") {
            setError("Required");
            return;
        }
        try {
            let value = {
                username: username,
            };
            const { data } = await Api.put(
                "/update_current_user_account",
                value
            );

            if (data.success) {
                setSuccess(true);
                setError("");
                setShow(false);
            } else {
                setSuccess(false);
                setError(data.error);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="mt-5 text-center">
            <Container>
                <SuccessModal
                    success={success}
                    titleText="Success"
                    bodyText="Your username has been updated."
                    buttonText="Got it"
                    tabHandler={props.tabHandler}
                    tab="myProfile"
                    successReset={successReset}
                />
                <Modal
                    show={show}
                    onHide={handleClose}
                    className="account-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Update username</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="username">Enter new username</label>
                        <input
                            type="text"
                            className="form-control block shadow-none"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            name="username"
                        />
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
                            onClick={updateAccountHandler}
                            className="bttn-material-flat bttn-sm update-account-modal-btn"
                        >
                            Update
                        </button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
});

export default UsernameModal;
