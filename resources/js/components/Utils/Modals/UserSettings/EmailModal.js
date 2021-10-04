import React, { useState, useEffect } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Api from "../../../Api";

const EmailModal = withRouter((props) => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [profileData, setProfileData] = useState(null);
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

    console.log(email, "email");

    return (
        <div className="mt-5 text-center">
            <Container>
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
                            type="text"
                            className="form-control block shadow-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="text"
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
                            onClick={() => console.log("ran")}
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
