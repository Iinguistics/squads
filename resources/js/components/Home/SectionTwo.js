import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../../../css/bttn/bttn.min.css";

const SectionTwo = withRouter((props) => {
    return (
        <div className="section-2">
            <Container className="mt-5">
                <h3>Squads is a connection platform for everyone.</h3>
                <p>How can we help you get started?</p>
                <Row className="mt-5 test">
                    <Col>
                        <Card className="item-1 shadow ">
                            <Card.Body>
                                <Card.Text>
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="item-2 shadow">
                            <Card.Body>
                                <Card.Text>
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="item-3 shadow">
                            <Card.Body>
                                <Card.Text>
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
});

export default SectionTwo;
