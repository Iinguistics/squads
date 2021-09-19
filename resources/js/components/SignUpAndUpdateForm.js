import React, { useState } from "react";
import Api from "./Api";
import { Container, Form, Row, Col } from "react-bootstrap";
import "../../css/bttn/bttn.min.css";

const SignUpAndUpdateForm = (props) => {
    const [eyeTextToggle, setEyeTextToggle] = useState(false);

    const [email, setEmail] = useState(props.email);
    const [gamerTag, setGamerTag] = useState(props.gamerTag);
    const [platform, setPlatform] = useState(props.platform);
    const [activisionID, setActivisionID] = useState(props.activisionID);
    const [password, setPassword] = useState(props.password);

    const [emailEmpty, setEmailEmpty] = useState(false);
    const [gamerTagEmpty, setGamerTagEmpty] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(false);

    const [showEmailRequired, setShowEmailRequired] = useState(false);
    const [showGamerTagRequired, setShowGamerTagRequired] = useState(false);
    const [showPasswordRequired, setShowPasswordRequired] = useState(false);

    const eyeTextToggleHandler = () => {
        setEyeTextToggle(!eyeTextToggle);
    };

    const onEmailFocus = () => {
        setShowEmailRequired(false);
        setEmailEmpty(false);
    };
    const onGamerTagFocus = () => {
        setShowGamerTagRequired(false);
        setGamerTagEmpty(false);
    };
    const onPasswordFocus = () => {
        setShowPasswordRequired(false);
        setPasswordEmpty(false);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (email === "") {
            setShowEmailRequired(true);
        } else {
            setShowEmailRequired(false);
        }

        if (gamerTag === "") {
            setShowGamerTagRequired(true);
        } else {
            setShowGamerTagRequired(false);
        }

        if (password === "") {
            setShowPasswordRequired(true);
        } else {
            setShowPasswordRequired(false);
        }
    };

    const appUrl = process.env.MIX_APP_URL;
    return (
        <Container className="my-5">
            <Row className="d-flex justify-content-center">
                <Col className="col-md-8">
                    <div className="shadow-sm p-3 mb-5 bg-white rounded">
                        <Form onSubmit={submitHandler}>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() =>
                                    email === ""
                                        ? setEmailEmpty(true)
                                        : setEmailEmpty(false)
                                }
                                onFocus={onEmailFocus}
                            >
                                <Form.Label
                                    className={emailEmpty ? "text-danger" : ""}
                                >
                                    Email address
                                </Form.Label>{" "}
                                {showEmailRequired && (
                                    <span className="text-danger">
                                        Required
                                    </span>
                                )}
                                <div className="tooltip-arrow">
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        minLength="6"
                                        maxLength="60"
                                        className={
                                            emailEmpty
                                                ? "border-bottom border-danger shadow-none"
                                                : "shadow-none"
                                        }
                                    />
                                    {showEmailRequired && (
                                        <img
                                            src={`${appUrl}/images/curved-arrow-tooltip.png`}
                                            alt="arrow"
                                        />
                                    )}
                                </div>
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone
                                    else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicGamertag"
                                value={gamerTag}
                                onChange={(e) => setGamerTag(e.target.value)}
                                onBlur={() =>
                                    gamerTag === ""
                                        ? setGamerTagEmpty(true)
                                        : setGamerTagEmpty(false)
                                }
                                onFocus={onGamerTagFocus}
                            >
                                <Form.Label
                                    className={
                                        gamerTagEmpty ? "text-danger" : ""
                                    }
                                >
                                    Gamertag
                                </Form.Label>{" "}
                                {showGamerTagRequired && (
                                    <span className="text-danger">
                                        Required
                                    </span>
                                )}
                                <Form.Control
                                    type="text"
                                    placeholder="Enter gamertag"
                                    className={
                                        gamerTagEmpty
                                            ? "border-bottom border-danger shadow-none"
                                            : "shadow-none"
                                    }
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPlatform"
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}
                            >
                                <Form.Label>Platform</Form.Label>
                                <Form.Control
                                    as="select"
                                    aria-label="Default select example"
                                >
                                    <option value="psn">
                                        PlayStation Network
                                    </option>
                                    <option value="battle">Battle.net</option>
                                    <option value="xbl">Xbox Live</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicActivisionId"
                                value={activisionID}
                                onChange={(e) =>
                                    setActivisionID(e.target.value)
                                }
                            >
                                <Form.Label>Activision ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Activision ID Username"
                                />
                                <Form.Text className="text-muted">
                                    Optional
                                </Form.Text>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={() =>
                                    password === ""
                                        ? setPasswordEmpty(true)
                                        : setPasswordEmpty(false)
                                }
                                onFocus={onPasswordFocus}
                            >
                                <Form.Label
                                    className={
                                        passwordEmpty ? "text-danger" : ""
                                    }
                                >
                                    Password
                                </Form.Label>{" "}
                                {showPasswordRequired && (
                                    <span className="text-danger">
                                        Required
                                    </span>
                                )}
                                <div className="eye-text">
                                    <Form.Control
                                        minLength="6"
                                        maxLength="60"
                                        type={
                                            !eyeTextToggle ? "password" : "text"
                                        }
                                        placeholder="Password"
                                        className={
                                            passwordEmpty
                                                ? "border-bottom border-danger shadow-none"
                                                : "shadow-none"
                                        }
                                    />
                                    <img
                                        src={`${appUrl}/images/eye-text.png`}
                                        alt="eye"
                                        onClick={eyeTextToggleHandler}
                                    />
                                </div>
                            </Form.Group>
                            <button
                                className="bttn-unite bttn-sm bttn-primary"
                                type="submit"
                            >
                                {props.buttonText}
                            </button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

SignUpAndUpdateForm.defaultProps = {
    email: "",
    gamerTag: "",
    platform: "psn",
    activisionID: "",
    password: "",
    buttonText: "Create account",
    update: false,
};

export default SignUpAndUpdateForm;
