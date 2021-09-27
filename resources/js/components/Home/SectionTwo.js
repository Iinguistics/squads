import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../../../css/bttn/bttn.min.css";

const SectionTwo = withRouter((props) => {
    return (
        <div className="section-2">
            <Container>
                <h3>Squads is a connection platform for everyone.</h3>
                <p>How can we help you get started?</p>
                <Row>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    );
});

export default SectionTwo;
