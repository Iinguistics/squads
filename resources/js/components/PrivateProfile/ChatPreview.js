import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";

const ChatPreview = ({
    userInfo,
    fetchProfileHandler,
    profileData,
    success,
    error,
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
                        <div className="d-flex justify-content-start align-items-center">
                            <div className="img item-1 mr-3">
                                {" "}
                                <img
                                    src={`${appUrl}/images/default-photo-black-outline.png`}
                                    alt="happy face"
                                    className="chat-preview-default-photo"
                                />
                            </div>
                            <div className="item 2 ">
                                <span className="mr-1 font-weight-bold">
                                    {userInfo.gamertag}{" "}
                                </span>
                                <span>Today at 3:01 PM</span>
                                <p
                                    className={`appearance-font-color-${
                                        profileData
                                            ? profileData.font_color
                                            : ""
                                    }`}
                                >
                                    Waiting for the day when compact mode would
                                    be turned on
                                </p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ChatPreview;
