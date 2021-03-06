import React, { useState, useEffect } from "react";
import { Modal, Container, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Api from "../../Api";

const PasswordResetModal = withRouter((props) => {
    const [show, setShow] = useState(false);

    const [error, setError] = useState("");
    const [pin, setPin] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (props.showVerifyPin !== 0) {
            setShow(true);
        }
    }, [props.showVerifyPin]);

    const handleClose = () => {
        setError(false);
        setShow(false);
    };

    const verifyPinHandler = async () => {
        if (pin === "" || email === "") {
            setError("please fill out required fields");
            return;
        }
        try {
            let values = {
                email,
                pin,
            };
            const { data } = await Api.post(
                "/password_reset_verify_pin",
                values
            );

            if (data.success) {
                handleClose();
                props.passwordResetPinVerifiedHandler();
                props.passwordResetEmailHandler(email);
                setError("");
            } else {
                setError(data.error);
            }
        } catch (error) {
            handleClose();
            setError(error.message);
        }
    };

    return (
        <div className="mt-5 text-center">
            <Container>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Verify Pin{" "}
                            {error && (
                                <small className="text-danger">{error}</small>
                            )}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {props.alreadyHasPin ? (
                            <Form onSubmit={verifyPinHandler}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formBasicEmail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                    <Form.Label>Email</Form.Label>{" "}
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        className="shadow-none"
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formBasicPin"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                >
                                    <Form.Label>PIN</Form.Label>{" "}
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter pin #"
                                        className="shadow-none"
                                    />
                                </Form.Group>
                            </Form>
                        ) : (
                            <Form onSubmit={verifyPinHandler}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formBasicPin"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                >
                                    <Form.Label>PIN</Form.Label>{" "}
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter pin #"
                                        className="shadow-none"
                                    />
                                </Form.Group>
                            </Form>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            onClick={handleClose}
                            className="bttn-material-flat bttn-sm mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={verifyPinHandler}
                            className="bttn-material-flat bttn-sm bttn-primary"
                        >
                            Submit
                        </button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
});

export default PasswordResetModal;
