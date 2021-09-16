import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Moment from "react-moment";
import { Container, Row, Col } from "react-bootstrap";

const Main = () => {
    return (
        <Container className="my-4">
            <Row>
                <Col>
                    <div class="shadow p-3 mb-5 bg-white rounded">
                        Regular shadow
                    </div>
                </Col>
                <Col>
                    <div class="shadow-lg p-3 mb-5 bg-white rounded test">
                        Regular two
                    </div>
                </Col>
                <Col>
                    <div class="shadow-sm p-3 mb-5 bg-white rounded">
                        Regular three
                    </div>
                </Col>
                <Col>
                    <div class="shadow-sm p-3 mb-5 bg-white rounded">
                        Regular four
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Main;
