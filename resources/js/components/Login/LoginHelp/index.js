import React, { useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Form, Row, Col } from "react-bootstrap";
import { TiArrowBack } from "react-icons/ti";

const index = withRouter((props) => {
    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            props.history.push("/profile");
        }
    }, []);

    return (
        <div className="container mt-5">
            <Row className="d-flex justify-content-center">
                <Col className="col-md-8">
                    <div className="shadow-sm p-3 mb-5 bg-white rounded mt-5">
                        <div className="login-help-header">
                            <Link to="/login">
                                <TiArrowBack />
                            </Link>
                            <span>I need to</span>
                        </div>
                        <div className="login-help-links">
                            <Col>
                                <Link to="/">Reset my password</Link>
                            </Col>
                            <div className="login-help-links-divider my-3"></div>
                            <Col>
                                <Link to="/">Recover my email</Link>
                            </Col>
                            <div className="login-help-links-divider my-3"></div>
                            <Col>
                                <Link to="/">Contact customer support</Link>
                            </Col>
                            <div className="login-help-links-divider my-3"></div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
});

export default index;
