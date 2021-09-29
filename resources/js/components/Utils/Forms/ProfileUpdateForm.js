import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import Api from "../../Api";
import * as yup from "yup";
import { Formik } from "formik";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import "../../../../css/bttn/bttn.min.css";
import SuccessModal from "../Modals/SuccessModal";

const ProfileUpdateForm = withRouter((props) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const schema = yup.object().shape({
        firstName: yup.string(),
        lastName: yup.string(),
        displayName: yup.string(),
        location: yup.string(),
        bio: yup.string().max(10, "Must not exceed 300 characters"),
        carrier: yup.string(),
        ping: yup.string(),
        downloadSpeed: yup.string(),
        uploadSpeed: yup.string(),
    });

    const test = (e) => {
        e.preventDefault();

        console.log("ran");
    };

    return (
        <Container className="my-5">
            <Row className="d-flex justify-content-center">
                <Col className="col-12">
                    {loading && (
                        <div className="lds-hourglass d-flex justify-content-center m-auto"></div>
                    )}
                    <SuccessModal />
                    <div className="shadow-sm p-3 mb-5 bg-white rounded">
                        {error && <span className="text-danger">{error}</span>}
                        <Formik
                            validationSchema={schema}
                            onSubmit={test}
                            initialValues={{
                                firstName: "",
                                lastName: "",
                                displayName: "",
                                location: "",
                                bio: "",
                                carrier: "",
                                ping: "",
                                downloadSpeed: "",
                                uploadSpeed: "",
                                twitch: "",
                                twitter: "",
                                instagram: "",
                                youtube: "",
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
                                    <h5>Basic info:</h5>
                                    <Form.Row>
                                        <Form.Group
                                            as={Col}
                                            md="6"
                                            controlId="validationFormik01"
                                        >
                                            <Form.Label>First name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="firstName"
                                                placeholder="Enter first name"
                                                value={values.firstName}
                                                onChange={handleChange}
                                                className="shadow-none"
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="6"
                                            controlId="validationFormik02"
                                        >
                                            <Form.Label>Last name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="lastName"
                                                placeholder="Enter last name"
                                                value={values.lastName}
                                                onChange={handleChange}
                                                className="shadow-none"
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group
                                            as={Col}
                                            md="6"
                                            controlId="validationFormik05"
                                        >
                                            <Form.Label>
                                                Display name
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter display name"
                                                name="displayName"
                                                value={values.displayName}
                                                onChange={handleChange}
                                                className="shadow-none"
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="6"
                                            controlId="validationFormik05"
                                        >
                                            <Form.Label>Location</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="(e.g. Dallas, Tx)"
                                                name="location"
                                                value={values.location}
                                                onChange={handleChange}
                                                className="shadow-none"
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group
                                            as={Col}
                                            md="12"
                                            controlId="validationFormik05"
                                        >
                                            <Form.Label>Bio</Form.Label>
                                            <InputGroup hasValidation>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    type="text"
                                                    placeholder="Enter Bio"
                                                    name="bio"
                                                    value={values.bio}
                                                    onChange={handleChange}
                                                    className="shadow-none"
                                                    isInvalid={!!errors.bio}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.bio}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>

                                    <div className="light-divider my-3"></div>
                                    <h5>Internet info:</h5>
                                    <Form.Row>
                                        <Form.Group
                                            as={Col}
                                            md="3"
                                            controlId="validationFormik05"
                                        >
                                            <Form.Label>Carrier</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="(e.g. Comcast, AT&T)"
                                                name="carrier"
                                                value={values.carrier}
                                                onChange={handleChange}
                                                className="shadow-none"
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="3"
                                            controlId="validationFormik05"
                                        >
                                            <Form.Label>Ping</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter ping"
                                                name="ping"
                                                value={values.ping}
                                                onChange={handleChange}
                                                className="shadow-none"
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="3"
                                            controlId="validationFormik05"
                                        >
                                            <Form.Label>
                                                Download Speed
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter download"
                                                name="downloadSpeed"
                                                value={values.download}
                                                onChange={handleChange}
                                                className="shadow-none"
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="3"
                                            controlId="validationFormik05"
                                        >
                                            <Form.Label>
                                                Upload Speed
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter upload"
                                                name="uploadSpeed"
                                                value={values.upload}
                                                onChange={handleChange}
                                                className="shadow-none"
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    <a
                                        href="https://www.speedtest.net/"
                                        target="_blank"
                                    >
                                        Get my speeds
                                    </a>
                                    <div className="light-divider my-3"></div>
                                    <h5>Links:</h5>
                                    <Form.Row>
                                        <Form.Group
                                            as={Col}
                                            md="6"
                                            controlId="validationFormik05"
                                        >
                                            <Form.Label>Twitch</Form.Label>
                                            <div className="d-flex flex-row align-items-center">
                                                <span>
                                                    https://www.twitch.tv/
                                                </span>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Twitch Channel"
                                                    name="twitch"
                                                    value={values.twitch}
                                                    onChange={handleChange}
                                                    className="shadow-none"
                                                />
                                            </div>
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="6"
                                            controlId="validationFormik05"
                                        >
                                            <Form.Label>Twitter</Form.Label>
                                            <div className="d-flex flex-row align-items-center">
                                                <span>
                                                    https://twitter.com/
                                                </span>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Twitter Profile"
                                                    name="twitter"
                                                    value={values.twitter}
                                                    onChange={handleChange}
                                                    className="shadow-none"
                                                />
                                            </div>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group
                                            as={Col}
                                            md="6"
                                            controlId="validationFormik05"
                                        >
                                            <Form.Label>Instagram</Form.Label>
                                            <div className="d-flex flex-row align-items-center">
                                                <span>
                                                    https://www.instagram.com/
                                                </span>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Instagram profile"
                                                    name="instagram"
                                                    value={values.instagram}
                                                    onChange={handleChange}
                                                    className="shadow-none"
                                                />
                                            </div>
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="6"
                                            controlId="validationFormik05"
                                        >
                                            <Form.Label>Youtube</Form.Label>
                                            <div className="d-flex flex-row align-items-center">
                                                <span>
                                                    https://www.youtube.com/c/
                                                </span>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Youtube Channel"
                                                    name="youtube"
                                                    value={values.youtube}
                                                    onChange={handleChange}
                                                    className="shadow-none"
                                                />
                                            </div>
                                        </Form.Group>
                                    </Form.Row>

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

export default ProfileUpdateForm;
