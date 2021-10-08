import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";

const ProfileColors = ({
    userInfo,
    fetchProfileHandler,
    profileData,
    success,
    error,
    fontColorHandler,
    fontColor,
}) => {
    useEffect(() => {
        fetchProfileHandler();
    }, []);
    const appUrl = process.env.MIX_APP_URL;
    console.log(profileData, "appearance");
    return (
        <Container className="my-5">
            <Row className="d-flex">
                <Col className="col-12 col-md-9">
                    <div className="shadow-sm p-3 mb-5 appearance-bg rounded">
                        <label for="fontColor">Select a font color:</label>

                        <select
                            name="fontColor"
                            onChange={(e) => fontColorHandler(e.target.value)}
                        >
                            <option value="">
                                --Please choose an option--
                            </option>
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                        </select>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileColors;
