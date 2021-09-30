import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Api from "../../Api";
import * as yup from "yup";
import { Formik } from "formik";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import "../../../../css/bttn/bttn.min.css";
import SuccessModal from "../Modals/SuccessModal";

const ProfileUpdateForm = withRouter((props) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [profileData, setProfileData] = useState({});

    const fetchProfileHandler = async () => {
        try {
            const { data } = await Api.get("/profile");
            if (data.success) {
                setProfileData(data.data[0]);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        if (props.userInfo) {
            fetchProfileHandler();
        }
    }, []);

    const schema = yup.object().shape({
        first_name: yup.string(),
        last_name: yup.string(),
        display_name: yup.string(),
        location: yup.string(),
        bio: yup.string().max(300, "Must not exceed 300 characters"),
        carrier: yup.string(),
        ping: yup.string(),
        downloadSpeed: yup.string(),
        uploadSpeed: yup.string(),
        twitch: yup.string(),
        twitter: yup.string(),
        instagram: yup.string(),
        youtube: yup.string(),
    });

    const updateProfileHandler = async (values) => {
        try {
            const { data } = await Api.put("/profile", values);

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

    return (
        <Container className="my-5">
            <Row className="d-flex justify-content-center">
                <Col className="col-12">
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
                            onSubmit={(values) => updateProfileHandler(values)}
                            initialValues={{
                                first_name: profileData.first_name
                                    ? profileData.first_name
                                    : "",
                                last_name: profileData.last_name
                                    ? profileData.last_name
                                    : "",
                                display_name: profileData.display_name
                                    ? profileData.display_name
                                    : "",
                                location: profileData.location
                                    ? profileData.location
                                    : "",
                                bio: profileData.bio ? profileData.bio : "",
                                carrier: profileData.carrier
                                    ? profileData.carrier
                                    : "",
                                ping: profileData.ping ? profileData.ping : "",
                                download_speed: profileData.download_speed
                                    ? profileData.download_speed
                                    : "",
                                upload_speed: profileData.upload_speed
                                    ? profileData.upload_speed
                                    : "",
                                twitch: profileData.twitch
                                    ? profileData.twitch
                                    : "",
                                twitter: profileData.twitter
                                    ? profileData.twitter
                                    : "",
                                instagram: profileData.instagram
                                    ? profileData.instagram
                                    : "",
                                youtube: profileData.youtube
                                    ? profileData.youtube
                                    : "",
                            }}
                            enableReinitialize={true}
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
                                                name="first_name"
                                                placeholder="Enter first name"
                                                value={values.first_name}
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
                                                name="last_name"
                                                placeholder="Enter last name"
                                                value={values.last_name}
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
                                                name="display_name"
                                                value={values.display_name}
                                                onChange={handleChange}
                                                className="shadow-none"
                                                placeholder="Enter display name"
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
                                                    name="bio"
                                                    value={values.bio}
                                                    onChange={handleChange}
                                                    className="shadow-none"
                                                    isInvalid={!!errors.bio}
                                                    placeholder="Enter bio"
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
                                                name="download_speed"
                                                value={values.download_speed}
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
                                                name="upload_speed"
                                                value={values.upload_speed}
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
