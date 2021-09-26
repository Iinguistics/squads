import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Api from "../../Api";
import { Container, Form, Row, Col } from "react-bootstrap";
import "../../../../css/bttn/bttn.min.css";
import SuccessModal from "../Modals/SuccessModal";

const PasswordResetUpdateForm = withRouter((props) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [password, setPassword] = useState("");

    const passwordResetUpdateHandler = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            setError("password must be at least six characters.");
        } else {
            setError("");
        }

        try {
            setLoading(true);

            let values = {
                email: props.passwordResetEmail,
                password,
            };
            const { data } = await Api.post("/password_reset_update", values);

            if (data.success) {
                setLoading(false);
                setError(false);
                setSuccess(true);
            } else {
                setError(data.error);
                setSuccess(false);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            setError(error.data.message);
        }
    };

    return (
        <Container className="my-5">
            <Row className="d-flex justify-content-center">
                <Col className="col-md-6">
                    {loading && (
                        <div className="lds-hourglass d-flex justify-content-center m-auto"></div>
                    )}
                    <SuccessModal
                        success={success}
                        titleText="Successfully Updated Password"
                        bodyText="You can now log in & with your new password"
                        buttonText="Got it"
                        push="login"
                    />
                    <div className="shadow-sm p-3 mb-5 bg-white rounded">
                        {error && <span className="text-danger">{error}</span>}
                        <div className="text-muted my-3">
                            Pin # verified. Enter your new password below.{" "}
                            <br />
                            <small>Minimum of six characters </small>
                        </div>
                        <Form onSubmit={passwordResetUpdateHandler}>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                                value={props.passwordResetEmail}
                            >
                                <Form.Control
                                    type="email"
                                    className="shadow-none"
                                    value={props.passwordResetEmail}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            >
                                <Form.Label>New Password</Form.Label>{" "}
                                <div className="tooltip-arrow">
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        minLength="6"
                                        maxLength="60"
                                        className="shadow-none"
                                    />
                                </div>
                            </Form.Group>
                            <button
                                className="bttn-unite bttn-sm bttn-primary"
                                type="submit"
                                disabled={password === ""}
                            >
                                Submit
                            </button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
});

export default PasswordResetUpdateForm;
