import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Api from "../../Api";
import { Container, Form, Row, Col } from "react-bootstrap";
import "../../../../css/bttn/bttn.min.css";

const LoginForm = withRouter((props) => {
    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            props.history.push("/profile");
        }
    }, []);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [eyeTextToggle, setEyeTextToggle] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const eyeTextToggleHandler = () => {
        setEyeTextToggle(!eyeTextToggle);
    };

    const loginSubmitHandler = async (e) => {
        e.preventDefault();
        console.log("test");
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
                        <Form onSubmit={loginSubmitHandler}>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                                <Form.Label>Email address</Form.Label>{" "}
                                {error && (
                                    <span className="text-danger">{error}</span>
                                )}
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
