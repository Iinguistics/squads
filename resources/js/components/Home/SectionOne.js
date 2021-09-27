import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../../../css/bttn/bttn.min.css";

const SectionOne = withRouter((props) => {
    return (
        <div className="section-1 d-flex flex-column flex-md-row align-items-center justify-content-around align-self-center">
            <div>
                <h1>Create or Join a Squad</h1>
                <p>
                    Sign up, search for players or squads. <br />
                    Create your own squad, meet new people. <br /> Communicate
                    through messaging and live chat
                </p>
                <Link to="/register">
                    <button className="bttn-material-flat bttn-sm bttn-default">
                        Get Started
                    </button>
                </Link>
            </div>
            <div>item number 2</div>
        </div>
    );
});

export default SectionOne;
