import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Api from "../../../Api";
import SuccessModal from "../SuccessModal";

const GamertagModal = withRouter((props) => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [gamertag, setGamertag] = useState("");

    useEffect(() => {
        if (props.gamertagClicked !== 0) {
            setShow(true);
        }
    }, [props.gamertagClicked]);

    const handleClose = () => {
        setShow(false);
    };

    const fetchProfileHandler = async () => {
        setLoading(true);
        try {
            const { data } = await Api.get("/current_user");
            if (data) {
                setGamertag(data.gamertag);
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
        if (gamertag === "") {
            setError("Required");
            return;
        }
        try {
            let value = {
                gamertag: gamertag,
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
                    bodyText="Your gamertag has been updated."
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
                        <Modal.Title>Update Gamertag</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="gamertag">Enter new gamertag</label>
                        <input
                            type="text"
                            className="form-control block shadow-none"
                            value={gamertag}
                            onChange={(e) => setGamertag(e.target.value)}
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

export default GamertagModal;
