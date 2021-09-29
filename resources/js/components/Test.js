import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
//import Api from "../../Api";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";

const Test = withRouter((props) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [bio, setBio] = useState("");
    const [bioChars, setBioChars] = useState(20);

    const test = () => {
        console.log("ran");
    };

    const bioHandler = (e) => {
        if (bio.length === 20) {
            setError("cant exceed 20 characters");
        } else {
            setError("");
            setBio(e.target.value);
            setBioChars(19 - bio.length);
        }
    };

    return (
        <Container className="my-5">
            <Row className="d-flex justify-content-center">
                <Col className="col-12">
                    {loading && (
                        <div className="lds-hourglass d-flex justify-content-center m-auto"></div>
                    )}
                    <div className="shadow-sm p-3 mb-5 bg-white rounded">
                        {error && <span className="text-danger">{error}</span>}

                        <Form noValidate onSubmit={test}>
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
                                        className="shadow-none"
                                    />
                                </Form.Group>
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
                                        className="shadow-none"
                                    />
                                </Form.Group>
                            </Form.Row>

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
                                        className="shadow-none"
                                    />
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    md="12"
                                    controlId="validationFormik05"
                                >
                                    <Form.Label>Bio</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        type="text"
                                        placeholder="Enter Bio"
                                        name="bio"
                                        value={bio}
                                        onChange={bioHandler}
                                        className="shadow-none"
                                    />
                                    <div>{bioChars}</div>
                                </Form.Group>
                            </Form.Row>
                            {error && (
                                <span className="text-danger">{error}</span>
                            )}
                            <button
                                className="bttn-unite bttn-sm bttn-primary"
                                type="submit"
                            >
                                Save
                            </button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
});

export default Test;
