import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Api from "../Api";
import Head from "./Head";

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
            <h1 className="mb-5 text-center">Squad Preview</h1>
            <Head squad={squad} />
        </div>
    );
});

export default index;
