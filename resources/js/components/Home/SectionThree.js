import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../../../css/bttn/bttn.min.css";

const SectionThree = withRouter((props) => {
    return (
        <div className="section-3">
            <Container>
                <Row>
                    <Col className="col-12 col-md-6 item-2">
                        <div>item number 2</div>
                    </Col>
                    <Col className="col-12 col-md-6 item-1">
                        <div>
                            <h1>Create or Join a Squad</h1>
                            <p>
                                Sign up, search for players or squads. <br />
                                Create your own squad, meet new people. <br />{" "}
                                Communicate through messaging and live chat
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
});

export default SectionThree;
