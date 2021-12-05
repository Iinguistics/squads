import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import Api from "../Api";
import Head from "./Head";
import { TiArrowBack } from "react-icons/ti";

const index = withRouter((props) => {
    const [squad, setSquad] = useState(null);

    const fetchSquadHandler = async () => {
        const { data } = await Api.get(`/fetch_squad/${props.match.params.id}`);
        setSquad(data.data);
    };

    useEffect(() => {
        fetchSquadHandler();
    }, []);

    console.log(squad, "squad details");

    return (
        <div className="container main-header">
            <div className="login-help-header">
                <Link to="/squads">
                    <TiArrowBack />
                </Link>
            </div>
            <h1 className="mb-5 text-center">Squad Preview</h1>
            <Head squad={squad} />
        </div>
    );
});

export default index;
