import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import "../../../css/bttn/bttn.min.css";
import SuccessModal from "../Utils/Modals/SuccessModal";
import Api from "../Api";

const ProfileColors = ({
    userInfo,
    //fetchProfileHandler,
    profileData,
    fontColorHandler,
    fontColor,
    tabHandler,
}) => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const fetchProfileHandler = async () => {
        try {
            const { data } = await Api.get("/show_current_user_profile");
            if (data.success) {
                setProfileData(data.data[0]);
                setError("");
                setFontColor(data.data[0].font_color);
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchProfileHandler();
    }, []);

    const updateProfileHandler = async (e) => {
        e.preventDefault();
        console.log("ran");
        try {
            values = { font_color: fontColor };
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
                    />
                    <div className="shadow-sm p-3 mb-5 appearance-bg rounded">
                        <Form onSubmit={updateProfileHandler}>
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
