import React, { useState, useEffect } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Api from "../../../Api";
import SuccessModal from "../SuccessModal";

const EmailModal = withRouter((props) => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (props.emailClicked !== 0) {
            setShow(true);
        }
    }, [props.emailClicked]);

    const handleClose = () => setShow(false);

    const fetchProfileHandler = async () => {
        setLoading(true);
        try {
            const { data } = await Api.get("/current_user");
            if (data) {
                setEmail(data.email);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchProfileHandler();
    }, []);

    const updateAccountHandler = async () => {
        if (email === "") {
            setError("Required");
            return;
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setError("Invalid email address");
            return;
        }
        try {
            let value = {
                email: email,
            };
            const { data } = await Api.put(
                "/update_current_user_account_email",
                value
            );

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

    return (
        <div className="mt-5 text-center">
            <Container>
                <SuccessModal
                    success={success}
                    titleText="Success"
                    bodyText="Your email has been updated."
                    buttonText="Got it"
                    tabHandler={props.tabHandler}
                    tab="myProfile"
                />
                <Modal
                    show={show}
                    onHide={handleClose}
                    className="account-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Update Email</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="email">Enter new email</label>
                        <input
                            type="email"
                            className="form-control block shadow-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            minLength="6"
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

export default EmailModal;
