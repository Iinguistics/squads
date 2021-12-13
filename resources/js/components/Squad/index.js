import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Api from "../Api";

const index = withRouter((props) => {
    const [squad, setSquad] = useState(null);
    const [requestsToJoin, setRequestsToJoin] = useState(null);

    const fetchSquadHandler = async () => {
        const { data } = await Api.get(`/fetch_squad/${props.match.params.id}`);
        setSquad(data.data);
    };

    const fetchSquadRequestsHandler = async () => {
        const { data } = await Api.get(
            `/fetch_squad_requests/${props.match.params.id}`
        );
        setRequestsToJoin(data.data);
    };

    useEffect(() => {
        fetchSquadHandler();
        fetchSquadRequestsHandler();
    }, []);

    console.log(squad, "squad");
    console.log(requestsToJoin, "requests");

    return <div className="container main-header">squad main page</div>;
});

export default index;
