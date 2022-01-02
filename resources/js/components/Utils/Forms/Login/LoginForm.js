import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Api from "../../../Api";
import { Container, Form, Row, Col } from "react-bootstrap";
import "../../../../../css/bttn/bttn.min.css";

const LoginForm = withRouter((props) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [eyeTextToggle, setEyeTextToggle] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const eyeTextToggleHandler = () => {
        setEyeTextToggle(!eyeTextToggle);
    };

    // to do: display Invalid credentials in this error state
    const loginSubmitHandler = async (e) => {
        e.preventDefault();

        if (email.length < 6 || password.length < 6) {
            setError("Invalid credentials");
            return;
        }

        try {
            setLoading(true);

            let values = {
                email,
                password,
            };
            const { data } = await Api.post("/login", values);

            localStorage.setItem("userInfo", JSON.stringify(data.data));

            if (data.success) {
                props.loggedInToggleHandler();
                props.history.push("/profile");
            } else {
                setError(data.error);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            setError("Invalid credentials");
        }
    };

    const appUrl = process.env.MIX_APP_URL;
    return (
        <Container className="my-5">
            <Row className="d-flex justify-content-center">
                <Col className="col-md-6">
                    {loading && (
                        <div className="lds-hourglass d-flex justify-content-center m-auto"></div>
                    )}
                    <div className="shadow-sm p-3 mb-5 bg-white rounded">
                        {error && <span className="text-danger">{error}</span>}
                        <Form onSubmit={loginSubmitHandler}>
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
                                        placeholder="Enter email"
                                        minLength="6"
                                        maxLength="60"
                                        className="shadow-none"
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            >
                                <Form.Label>Password</Form.Label>
                                <div className="eye-text">
                                    <Form.Control
                                        maxLength="60"
                                        type={
                                            !eyeTextToggle ? "password" : "text"
                                        }
                                        placeholder="Password"
                                        className="shadow-none"
                                        data-testid="password"
                                    />
                                    <img
                                        src={`${appUrl}/images/eye-text.png`}
                                        alt="eye"
                                        onClick={eyeTextToggleHandler}
                                    />
                                </div>
                            </Form.Group>
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <span
                                    className="main-blue help-link"
                                    onClick={() =>
                                        props.history.push("/login-help")
                                    }
                                >
                                    Help{" "}
                                    <img
                                        src={`${appUrl}/images/information.png`}
                                        alt="info"
                                    />
                                </span>

                                <button
                                    className="bttn-unite bttn-sm bttn-primary"
                                    type="submit"
                                    disabled={email === "" || password === ""}
                                >
                                    Sign in
                                </button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
});

export default LoginForm;
