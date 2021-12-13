import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Api from "../Api";
import SquadProvider, { SquadContext } from "../Context/SquadContext";

const index = withRouter((props) => {
    const [squad, setSquad] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);

    const fetchSquadHandler = async () => {
        const { data } = await Api.get(`/fetch_squad/${props.match.params.id}`);
        setSquad(data.data);
    };
    const fetchIsAdmin = async () => {
        const { data } = await Api.get(
            `/check_is_admin/${props.match.params.id}`
        );
        setIsAdmin(data.data);
    };

    useEffect(() => {
        fetchSquadHandler();
        fetchIsAdmin();
    }, []);

    console.log(squad, "squad");
    console.log(isAdmin, "test");

    return (
        <SquadProvider>
            <SquadContext.Consumer>
                {({ loggedInToggleHandler }) => {
                    return (
                        <div className="container main-header">
                            squad main page
                        </div>
                    );
                }}
            </SquadContext.Consumer>
        </SquadProvider>
    );
});

export default index;
