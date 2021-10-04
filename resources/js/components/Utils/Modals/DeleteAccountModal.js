import React, { useState, useEffect } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Api from "../../Api";

const DeleteAccountModal = withRouter((props) => {
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (props.deleteAccountClicked !== 0) {
            setShow(true);
        }
    }, [props.deleteAccountClicked]);

    const handleClose = () => setShow(false);

    const deleteAccountHandler = async () => {
        if (password.length < 6) {
            setError("Invalid credentials");
            return;
        } else {
            setError("");
        }
        try {
            const values = {
                password: password,
            };
            const { data } = await Api.put("/account_destroy", values);

            if (data.success) {
                localStorage.removeItem("userInfo");
                props.loggedInToggleHandler();
                handleClose();
                props.history.push("/");
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="mt-5 text-center">
            <Container>
                <Modal
                    show={show}
                    onHide={handleClose}
                    className="account-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title className="text-danger">
                            Danger Zone
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete your account?
                    </Modal.Body>
                    <Modal.Body>
                        <div>
                            <label htmlFor="password">Enter Password</label>
                            <input
                                type="password"
                                className="form-control block shadow-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                            />
                        </div>
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
                            onClick={deleteAccountHandler}
                            className="bttn-material-flat bttn-sm delete-account-modal-btn"
                        >
                            Delete
                        </button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
});

export default DeleteAccountModal;
