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
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        username: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().required(),
        zip: yup.string().required(),
        terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
    });

    const test = () => {
        console.log("ran");
    };

    return (
        <Container className="my-5">
            <Row className="d-flex justify-content-center">
                <Col className="col-9">
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
                                firstName: "Mark",
                                lastName: "Otto",
                                username: "",
                                city: "",
                                state: "",
                                zip: "",
                                terms: false,
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
                                    <Form.Row>
                                        <Form.Group
                                            as={Col}
                                            md="4"
                                            controlId="validationFormik01"
                                        >
                                            <Form.Label>First name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="firstName"
                                                value={values.firstName}
                                                onChange={handleChange}
                                                isValid={
                                                    touched.firstName &&
                                                    !errors.firstName
                                                }
                                            />
                                            <Form.Control.Feedback>
                                                Looks good!
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="4"
                                            controlId="validationFormik02"
                                        >
                                            <Form.Label>Last name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="lastName"
                                                value={values.lastName}
                                                onChange={handleChange}
                                                isValid={
                                                    touched.lastName &&
                                                    !errors.lastName
                                                }
                                            />

                                            <Form.Control.Feedback>
                                                Looks good!
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group
                                            as={Col}
                                            md="6"
                                            controlId="validationFormik03"
                                        >
                                            <Form.Label>City</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="City"
                                                name="city"
                                                value={values.city}
                                                onChange={handleChange}
                                                isInvalid={!!errors.city}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {errors.city}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="3"
                                            controlId="validationFormik04"
                                        >
                                            <Form.Label>State</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="State"
                                                name="state"
                                                value={values.state}
                                                onChange={handleChange}
                                                isInvalid={!!errors.state}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.state}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group
                                            as={Col}
                                            md="4"
                                            controlId="validationFormikUsername"
                                        >
                                            <Form.Label>Username</Form.Label>
                                            <InputGroup hasValidation>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text id="inputGroupPrepend">
                                                        @
                                                    </InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Username"
                                                    aria-describedby="inputGroupPrepend"
                                                    name="username"
                                                    value={values.username}
                                                    onChange={handleChange}
                                                    isInvalid={
                                                        !!errors.username
                                                    }
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.username}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="3"
                                            controlId="validationFormik05"
                                        >
                                            <Form.Label>Zip</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Zip"
                                                name="zip"
                                                value={values.zip}
                                                onChange={handleChange}
                                                isInvalid={!!errors.zip}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {errors.zip}
                                            </Form.Control.Feedback>
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
                                                name="download"
                                                value={values.download}
                                                onChange={handleChange}
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
                                                name="upload"
                                                value={values.upload}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    <button type="submit">Submit form</button>
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
