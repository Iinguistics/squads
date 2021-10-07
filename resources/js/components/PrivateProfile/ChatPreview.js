import React from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";

const ChatPreview = () => {
    const appUrl = process.env.MIX_APP_URL;

    return (
        <Container className="my-5">
            <Row className="d-flex justify-content-center">
                <Col className="col-12">
                    <div className="shadow-sm p-3 mb-5 bg-white rounded">
                        <div className="d-flex justify-content-start align-items-center">
                            <div className="img item-1 mr-3">
                                {" "}
                                <img
                                    src={`${appUrl}/images/happy-face-black.png`}
                                    alt="happy face"
                                    className="happy-face"
                                />
                            </div>
                            <div className="item 2 ">
                                <span className="mr-2">thyJames</span>
                                <span>Today at 11:47 AM</span>
                                <p>
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
