import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import Api from "../Api";

const ChatPreview = ({ userInfo, profileData, fontColor, profileColor }) => {
    const appUrl = process.env.MIX_APP_URL;
    console.log(profileData, "appearance");
    return (
        <div className="my-5">
            <Row>
                <Col className="col-12 col-md-9">
                    <div className="shadow-sm p-3 mb-5 appearance-bg rounded">
                        <div className="d-flex justify-content-start align-items-center">
                            <div className="mr-3">
                                {" "}
                                <img
                                    src={
                                        profileData
                                            ? profileData.photo
                                                ? profileData.photo
                                                : `${appUrl}/images/default-photo-black-outline.png`
                                            : `${appUrl}/images/default-photo-black-outline.png`
                                    }
                                    alt="profile photo"
                                    className={`chat-preview-photo appearance-profile-color-${profileColor}`}
                                />
                            </div>
                            <div className="item 2">
                                <span className="mr-1 font-weight-bold">
                                    {userInfo.gamertag}{" "}
                                </span>
                                <span>Today at 3:01 PM</span>
                                <p
                                    className={`appearance-font-color-${fontColor}`}
                                >
                                    Waiting for the day when compact mode would
                                    be turned on
                                </p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ChatPreview;
