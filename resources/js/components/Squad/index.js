import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Api from "../Api";

const index = withRouter((props) => {
    const [squad, setSquad] = useState(null);

    const fetchSquadHandler = async () => {
        const { data } = await Api.get(`/fetch_squad/${props.match.params.id}`);
        setSquad(data.data);
    };

    useEffect(() => {
        fetchSquadHandler();
    }, []);

    console.log(squad);

    return <div className="container main-header">squad main page</div>;
});

export default index;
