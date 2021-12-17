import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Api from "../Api";
import { GrUserAdmin } from "react-icons/gr";
import Request from "./Requests";
import BannerFontFamily from "./BannerFontFamily";

const index = withRouter((props) => {
    const [squad, setSquad] = useState(null);

    const fetchSquadHandler = async () => {
        const { data } = await Api.get(`/fetch_squad/${props.match.params.id}`);
        setSquad(data.data);
    };

    useEffect(() => {
        fetchSquadHandler();
    }, []);

    console.log(squad, "admin portal");

    return (
        <div className="container main-header">
            <div className="fs-22 mb-5 text-center text-md-left">
                <GrUserAdmin /> <span>Admin Portal</span>
            </div>
            <div className="d-flex flex-column flex-wrap flex-md-row justify-content-between align-items-center">
                <Request squad={squad} />
                <BannerFontFamily squad={squad} />
            </div>
        </div>
    );
});

export default index;
