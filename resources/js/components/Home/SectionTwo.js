import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../../../css/bttn/bttn.min.css";

const SectionTwo = withRouter((props) => {
    return (
        <div className="section-2">
            <Container>
                <div className="my-5">
                    <h3>Squads is a connection platform for everyone.</h3>
                    <p>How can we help you get started?</p>
                </div>
                <div className="d-flex flex-nowrap justify-content-around align-items-center align-content-center mt-5 test">
                    <Link to="/">
                        <Card className="item-1 shadow-lg">
                            <Card.Body>
                                <Card.Text>
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                    <Link to="/">
                        <Card className="item-2 shadow-lg">
                            <Card.Body>
                                <Card.Text>
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                    <Link to="/">
                        <Card className="item-3 shadow-lg">
                            <Card.Body>
                                <Card.Text>
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </div>
            </Container>
        </div>
    );
});

export default SectionTwo;
