import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const index = () => {
    return (
        <Container className="my-5">
            <Row>
                <Col>
                    <div className="shadow-sm p-3 mb-5 bg-white rounded">
                        Regular three
                    </div>
                </Col>
                <Col>
                    <div className="shadow-sm p-3 mb-5 bg-white rounded">
                        Regular four
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default index;
