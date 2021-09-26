import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import Api from "../../Api";
import { Container, Form, Row, Col } from "react-bootstrap";
import "../../../../css/bttn/bttn.min.css";
import PasswordResetModal from "../Modals/PasswordResetModal";
import { TiArrowBack } from "react-icons/ti";

const PasswordResetRequestForm = withRouter((props) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showVerifyPin, setShowVerifyPin] = useState(0);
    const [alreadyHasPin, setAlreadyHasPin] = useState(false);

    const [email, setEmail] = useState("");

    const alreadyHasPinHandler = () => {
        setAlreadyHasPin(true);
        showVerifyPindHandler();
    };

    const showVerifyPindHandler = () => {
        setShowVerifyPin((showVerifyPin) => showVerifyPin + 1);
    };

    const passwordResetHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            let values = {
                email,
            };
            const { data } = await Api.post("/password_reset_request", values);

            if (data.success) {
                setLoading(false);
                setAlreadyHasPin(false);
                showVerifyPindHandler();
                props.passwordResetEmailHandler(email);
            } else {
                setError(data.error);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            setError(error.data.message);
        }
    };

    const appUrl = process.env.MIX_APP_URL;
    return (
        <Container className="my-5">
            <Row className="d-flex justify-content-center">
                <Col className="col-md-6">
                    <PasswordResetModal
                        showVerifyPin={showVerifyPin}
                        alreadyHasPin={alreadyHasPin}
                        passwordResetPinVerifiedHandler={
                            props.passwordResetPinVerifiedHandler
                        }
                        passwordResetEmailHandler={
                            props.passwordResetEmailHandler
                        }
                    />
                    {loading && (
                        <div className="lds-hourglass d-flex justify-content-center m-auto"></div>
                    )}
                    <div className="shadow-sm p-3 mb-5 bg-white rounded">
                        {error && <span className="text-danger">{error}</span>}
                        <Link to="/login-help" className="login-help-header">
                            <TiArrowBack />
                        </Link>
                        <div className="text-muted mb-3">
                            Enter your email. If it matches our records, we’ll
                            send you an email with a verification pin to reset
                            your password.
                        </div>
                        <Form onSubmit={passwordResetHandler}>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                                <Form.Label>Email address</Form.Label>{" "}
                                <div className="tooltip-arrow">
                                    <Form.Control
                                        type="email"
                                        //placeholder="Enter email"
                                        minLength="6"
                                        maxLength="60"
                                        className="shadow-none"
                                    />
                                </div>
                            </Form.Group>
                            <div className="d-flex justify-content-between align-items-center">
                                <button
                                    className="bttn-unite bttn-sm bttn-primary"
                                    type="submit"
                                    disabled={email === ""}
                                >
                                    Send
                                </button>
                                <span
                                    className="help-link main-blue"
                                    onClick={alreadyHasPinHandler}
                                >
                                    I Already have a reset pin
                                </span>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
});

export default PasswordResetRequestForm;
