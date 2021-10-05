import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Api from "../../../Api";
import SuccessModal from "../SuccessModal";

const ActivisionIdModal = withRouter((props) => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [activisionId, setActivisionId] = useState("");

    useEffect(() => {
        if (props.activisionClicked !== 0) {
            setShow(true);
        }
    }, [props.activisionClicked]);

    const handleClose = () => {
        setShow(false);
    };

    const fetchProfileHandler = async () => {
        setLoading(true);
        try {
            const { data } = await Api.get("/current_user");
            if (data) {
                setActivisionId(data.activision_username);
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
        if (activisionId === "") {
            setError("Required");
            return;
        }
        try {
            let value = {
                activision_username: activisionId,
            };
            const { data } = await Api.put(
                "/update_current_user_account",
                value
            );

            if (data.success) {
                setSuccess(true);
                setError(false);
                setShow(false);
            } else {
                setSuccess(false);
                setError(true);
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
                    bodyText="Your activision id has been updated."
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
                        <Modal.Title>Update Activision id</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="activisionId">
                            Enter new activision id
                        </label>
                        <input
                            type="text"
                            className="form-control block shadow-none"
                            value={activisionId ? activisionId : ""}
                            onChange={(e) => setActivisionId(e.target.value)}
                            name="activisionId"
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

export default ActivisionIdModal;
