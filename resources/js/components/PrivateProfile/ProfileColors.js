import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import "../../../css/bttn/bttn.min.css";
import SuccessModal from "../Utils/Modals/SuccessModal";

const ProfileColors = ({
    userInfo,
    fetchProfileHandler,
    profileData,
    success,
    error,
    fontColorHandler,
    fontColor,
    updateProfileHandler,
}) => {
    useEffect(() => {
        fetchProfileHandler();
    }, []);

    console.log(profileData, "appearance");
    return (
        <Container className="my-5">
            <Row className="d-flex">
                <Col className="col-12 col-md-9">
                    <SuccessModal
                        success={success}
                        titleText="Success"
                        bodyText="Your font color has been updated."
                        buttonText="Got it"
                        //push="/profile"
                        // tabHandler={props.tabHandler}
                        //tab={"appearance"}
                    />
                    <div className="shadow-sm p-3 mb-5 appearance-bg rounded">
                        <Form
                            onSubmit={() =>
                                updateProfileHandler({ font_color: fontColor })
                            }
                        >
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPlatform"
                                value={fontColor}
                                onChange={(e) =>
                                    fontColorHandler(e.target.value)
                                }
                            >
                                <Form.Label>Font Color</Form.Label>
                                <Form.Control
                                    as="select"
                                    aria-label="Default select"
                                >
                                    <option value="">Select a color</option>
                                    <option value="red">Red</option>
                                    <option value="blue">Blue</option>
                                    <option value="green">Green</option>
                                </Form.Control>
                            </Form.Group>
                            <button
                                className="bttn-unite bttn-sm bttn-primary"
                                type="submit"
                                disabled={!fontColor}
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

export default ProfileColors;
