import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";

const index = withRouter(() => {
    return (
        <div>
            <SectionOne />
            <SectionTwo />
            <SectionThree />
        </div>
    );
});

export default index;
