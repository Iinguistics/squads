import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import "../../../css/bttn/bttn.min.css";

const RegisterForm = () => {
    const [eyeTextToggle, setEyeTextToggle] = useState(false);
    const [eyeText, setEyeText] = useState("");

    const eyeTextToggleHandler = () => {
        setEyeTextToggle(!eyeTextToggle);
    };

    const appUrl = process.env.MIX_APP_URL;
    return (
        <Container className="my-5">
            <Row className="d-flex justify-content-center">
                <Col className="col-8">
                    <div className="shadow-sm p-3 mb-5 bg-white rounded">
                        <Form>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone
                                    else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicGamertag"
                            >
                                <Form.Label>Gamertag</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter gamertag"
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                            >
                                <Form.Label>Password</Form.Label>
                                <div className="eye-text">
                                    <Form.Control
                                        type={
                                            !eyeTextToggle ? "password" : "text"
                                        }
                                        placeholder="Password"
                                    />
                                    <img
                                        src={`${appUrl}/images/eye-text.png`}
                                        alt="eye"
                                        onClick={eyeTextToggleHandler}
                                    />
                                </div>
                            </Form.Group>
                            <button class="bttn-unite bttn-sm bttn-primary">
                                Create account
                            </button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterForm;
