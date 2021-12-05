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

    console.log(squad, "squad details");

    return (
        <div className="container main-header">
            <div className="d-flex flex-column flex-wrap flex-md-row justify-content-around align-items-center shadow-sm p-3 mb-5 bg-white rounded">
                preview test
            </div>
        </div>
    );
});

export default index;
