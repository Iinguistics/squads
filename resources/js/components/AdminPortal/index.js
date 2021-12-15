import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Api from "../Api";
import { GiFurBoot } from "react-icons/gi";

const index = withRouter(() => {
    return (
        <div className="container main-header">
            <div className="d-flex flex-column flex-wrap flex-md-row justify-content-around align-items-center">
                <div className="card squad-card my-4 my-md-0">
                    <GiFurBoot />
                </div>
            </div>
        </div>
    );
});

export default index;
