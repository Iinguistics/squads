import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SectionOne from "./SectionOne";

const index = () => {
    return (
        <div>
            <SectionOne />
            <div className="section-1 d-flex flex-column flex-md-row align-items-center justify-content-around">
                <div className="shadow-sm p-3  rounded ">Regular three</div>
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
};

export default index;
