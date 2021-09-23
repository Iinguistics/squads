import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Api from "../../Api";
import { Container, Form, Row, Col } from "react-bootstrap";
import SuccessModal from "../Modals/SuccessModal";
import "../../../../css/bttn/bttn.min.css";

const SignUpAndUpdateForm = withRouter((props) => {
    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            props.history.push("/profile");
        }
    }, []);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(true);
    const [loading, setLoading] = useState(false);

    const [eyeTextToggle, setEyeTextToggle] = useState(false);

    const [email, setEmail] = useState(props.email);
    const [gamerTag, setGamerTag] = useState(props.gamerTag);
    const [platform, setPlatform] = useState(props.platform);
    const [activisionID, setActivisionID] = useState(props.activisionID);
    const [password, setPassword] = useState(props.password);

    const [emailEmpty, setEmailEmpty] = useState(false);
    const [gamerTagEmpty, setGamerTagEmpty] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(false);

    const eyeTextToggleHandler = () => {
        setEyeTextToggle(!eyeTextToggle);
    };

    const onEmailFocus = () => {
        setEmailEmpty(false);
        setError(false);
    };
    const onGamerTagFocus = () => {
        setGamerTagEmpty(false);
    };
    const onGamerTagBlur = () => {
        if (gamerTag === "") {
            setGamerTagEmpty(true);
        } else {
            setGamerTagEmpty(false);
        }
    };
    const onPasswordFocus = () => {
        setPasswordEmpty(false);
    };
    const onPasswordBlur = () => {
        if (password === "" || password.length < 6) {
            setPasswordEmpty(true);
        } else {
            setPasswordEmpty(false);
        }
    };

    const registerSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (email === "") {
            setEmailEmpty(true);
            setLoading(false);
            return;
        }
        if (gamerTag === "") {
            setGamerTagEmpty(true);
            setLoading(false);
            return;
        }
        if (password === "") {
            setPasswordEmpty(true);
            setLoading(false);
            return;
        }

        try {
            let values = {
                email: email,
                platform: platform,
                gamertag: gamerTag,
                activision_username: activisionID,
                password: password,
            };
            const { data } = await Api.post("/register", values);
            console.log(data);
            if (data.success) {
                setLoading(false);
                setSuccess(true);
            }

            if (data.error) {
                setError(data.error);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            alert(
                "oops, it looks like something went wrong. Try reloading the page & try again"
            );
        }
    };
    const appUrl = process.env.MIX_APP_URL;
    return (
        <Container className="my-5">
            <Row className="d-flex justify-content-center">
                <Col className="col-md-8">
                    <SuccessModal
                        success={success}
                        titleText="Successfully Registered"
                        bodyText="You can now log in & personalize your profile so other players can get to know you & squad up!"
                        buttonText="Got it"
                        push="login"
                    />
                    {loading && (
                        <div className="lds-hourglass d-flex justify-content-center m-auto"></div>
                    )}
                    <div className="shadow-sm p-3 mb-5 bg-white rounded">
                        <Form onSubmit={registerSubmitHandler}>
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
                                {emailEmpty && (
                                    <span className="text-danger">
                                        Required
                                    </span>
                                )}
                                {error && (
                                    <span className="text-danger">{error}</span>
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
                                    {emailEmpty && (
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
                                onBlur={onGamerTagBlur}
                                onFocus={onGamerTagFocus}
                            >
                                <Form.Label
                                    className={
                                        gamerTagEmpty ? "text-danger" : ""
                                    }
                                >
                                    Gamertag
                                </Form.Label>{" "}
                                {gamerTagEmpty && (
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
                                    className="shadow-none"
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
                                onBlur={onPasswordBlur}
                                onFocus={onPasswordFocus}
                            >
                                <Form.Label
                                    className={
                                        passwordEmpty ? "text-danger" : ""
                                    }
                                >
                                    Password
                                </Form.Label>{" "}
                                {passwordEmpty && (
                                    <span className="text-danger">
                                        Required
                                    </span>
                                )}
                                {passwordEmpty && (
                                    <span className="text-danger">
                                        {" "}
                                        Must be at least 6 characters
                                    </span>
                                )}
                                <div className="eye-text">
                                    <Form.Control
                                        //minLength="6"
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
                                disabled={
                                    emailEmpty || gamerTagEmpty || passwordEmpty
                                }
                            >
                                {props.buttonText}
                            </button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
});

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
