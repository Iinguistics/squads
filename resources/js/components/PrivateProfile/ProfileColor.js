import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import "../../../css/bttn/bttn.min.css";
import SuccessModal from "../Utils/Modals/SuccessModal";
import Api from "../Api";

const ProfileColor = ({ profileColorHandler, profileColor }) => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // useEffect(() => {
    //     fetchProfileHandler();
    // }, []);

    const updateProfileHandler = async (e) => {
        e.preventDefault();

        try {
            let values = { profile_color: profileColor };

            const { data } = await Api.put(
                "/update_current_user_profile",
                values
            );

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
            <Row className="d-flex">
                <Col className="col-12 col-md-9">
                    <SuccessModal
                        success={success}
                        titleText="Success"
                        bodyText="Your profile color has been updated."
                        buttonText="Got it"
                    />
                    <div className="shadow-sm p-3 mb-5 appearance-bg rounded">
                        <Form onSubmit={updateProfileHandler}>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPlatform"
                                value={profileColor}
                                onChange={(e) =>
                                    profileColorHandler(e.target.value)
                                }
                            >
                                <Form.Label>Profile Theme Color</Form.Label>
                                <Form.Control
                                    as="select"
                                    aria-label="Default select"
                                >
                                    <option value="">Select a color</option>
                                    <option value="red">Red</option>
                                    <option value="blue">Blue</option>
                                    <option value="green">Green</option>
                                    <option value="orange">Orange</option>
                                    <option value="pink">Pink</option>
                                    <option value="purple">Purple</option>
                                </Form.Control>
                            </Form.Group>
                            <button
                                className="bttn-unite bttn-sm bttn-primary"
                                type="submit"
                                disabled={!profileColor}
                            >
                                Save
                            </button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileColor;