import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Api from "./Api";
import * as yup from "yup";
import { Formik } from "formik";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import "../../css/bttn/bttn.min.css";
import SuccessModal from "./Utils/Modals/SuccessModal";

const Test = withRouter((props) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [eyeTextToggle, setEyeTextToggle] = useState(false);
    const eyeTextToggleHandler = () => {
        setEyeTextToggle(!eyeTextToggle);
    };

    const schema = yup.object().shape({
        email: yup.string().required(),
        gamertag: yup.string().required(),
        platform: yup.string().required(),
        activision_username: yup.string(),
        password: yup
            .string()
            .min(6, "Must be at least 6 characters")
            .required(),
    });

    const registerSubmitHandler = async (values) => {
        try {
            const { data } = await Api.post("/register", values);

            if (data.success) {
                setSuccess(true);
                setError(false);
            } else {
                setSuccess(false);
                setError(true);
            }
        } catch (error) {
            setError(error.message);
        }
    };
    const appUrl = process.env.MIX_APP_URL;
    return (
        <Container className="my-5">
            <Row className="d-flex justify-content-center">
                <Col className="col-md-8">
                    {loading && (
                        <div className="lds-hourglass d-flex justify-content-center m-auto"></div>
                    )}
                    <SuccessModal
                        success={success}
                        titleText="Success"
                        bodyText="Your profile has been updated."
                        buttonText="Got it"
                        push="profile"
                    />
                    <div className="shadow-sm p-3 mb-5 bg-white rounded">
                        {error && <span className="text-danger">{error}</span>}
                        <Formik
                            validationSchema={schema}
                            onSubmit={(values) => registerSubmitHandler(values)}
                            initialValues={{
                                email: "",
                                gamertag: "",
                                platform: "",
                                activision_username: "",
                                password: "",
                            }}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                values,
                                touched,
                                isValid,
                                errors,
                            }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group controlId="validationFormik01">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="Enter email"
                                            value={values.email}
                                            onChange={handleChange}
                                            className="shadow-none"
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="validationFormik02">
                                        <Form.Label>Gamertag</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="gamertag"
                                            placeholder="Enter gamertag"
                                            value={values.gamertag}
                                            onChange={handleChange}
                                            className="shadow-none"
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.gamertag}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="validationFormik03">
                                        <Form.Label>Platform</Form.Label>
                                        <Form.Control
                                            aria-label="Default select"
                                            as="select"
                                            type="text"
                                            name="platform"
                                            placeholder="Enter display name"
                                            value={values.platform}
                                            onChange={handleChange}
                                            className="shadow-none"
                                            isInvalid={!!errors.email}
                                        >
                                            <option value="psn">
                                                PlayStation Network
                                            </option>
                                            <option value="battle">
                                                Battle.net
                                            </option>
                                            <option value="xbl">
                                                Xbox Live
                                            </option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.platform}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="validationFormik04">
                                        <Form.Label>Activision ID</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter activision id"
                                            name="activision_username"
                                            value={values.activision_username}
                                            onChange={handleChange}
                                            className="shadow-none"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="validationFormik05">
                                        <Form.Label>Password</Form.Label>
                                        <div className="eye-text">
                                            <Form.Control
                                                type={
                                                    !eyeTextToggle
                                                        ? "password"
                                                        : "text"
                                                }
                                                placeholder="Password"
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                className="shadow-none"
                                                isInvalid={!!errors.password}
                                            />
                                            <img
                                                src={`${appUrl}/images/eye-text.png`}
                                                alt="eye"
                                                onClick={eyeTextToggleHandler}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </div>
                                    </Form.Group>

                                    <button
                                        className="bttn-unite bttn-sm bttn-primary"
                                        type="submit"
                                    >
                                        Save
                                    </button>
                                </Form>
                            )}
                        </Formik>{" "}
                    </div>
                </Col>
            </Row>
        </Container>
    );
});

export default Test;
