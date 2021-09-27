import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";

const index = withRouter(() => {
    return (
        <div>
            <SectionOne />
            <SectionTwo />
            <div className=" d-flex flex-column flex-md-row align-items-center justify-content-around">
                <div className="shadow-sm p-3   rounded">Regular three</div>
                <div className="shadow-sm p-3   rounded">Regular four</div>
                <div className="shadow-sm p-3   rounded">Regular three</div>
                <div className="shadow-sm p-3   rounded">Regular four</div>
            </div>

            <div className="d-flex align-items-center justify-content-between">
                <div>item</div>
                <div>item</div>
                <div>item</div>
                <div>item</div>
            </div>
        </div>
    );
});

export default index;
