import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Api from "../../../Api";
import SuccessModal from "../SuccessModal";

const PasswordModal = withRouter((props) => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [verifiedCurrentPassword, setVerifiedCurrentPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");

    useEffect(() => {
        if (props.passwordClicked !== 0) {
            setShow(true);
        }
    }, [props.passwordClicked]);

    const handleClose = () => {
        setShow(false);
    };

    const updateAccountHandler = async () => {
        if (currentPassword === "") {
            setError("current password required");
            return;
        }
        if (newPassword === "") {
            setError("new password required");
            return;
        }

        if (newPassword !== verifiedCurrentPassword) {
            setError("passwords do not match");
            return;
        }
        try {
            let values = {
                current_password: currentPassword,
                new_password: newPassword,
            };
            const { data } = await Api.put(
                "/update_current_user_account_password",
                values
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
                    bodyText="Your password has been updated."
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
                        <Modal.Title>Update Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="currentPassword">
                            Current password
                        </label>
                        <input
                            type="password"
                            className="form-control block shadow-none mb-3"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            name="currentPassword"
                        />
                        <label htmlFor="newPassword">New password</label>
                        <input
                            type="password"
                            className="form-control block shadow-none mb-3"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            name="newPassword"
                        />

                        <label htmlFor="verifiedCurrentPassword">
                            Verify new password
                        </label>
                        <input
                            type="password"
                            className="form-control block shadow-none mb-3"
                            value={verifiedCurrentPassword}
                            onChange={(e) =>
                                setVerifiedCurrentPassword(e.target.value)
                            }
                            name="verifiedCurrentPassword"
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

export default PasswordModal;
