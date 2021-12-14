import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Api from "../Api";
import SquadProvider, { SquadContext } from "../Context/SquadContext";
import Banner from "./Banner";
import Head from "./Head";

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
                {({}) => {
                    return (
                        <div className="container main-header">
                            <Banner squad={squad} />
                            <Head squad={squad} />
                        </div>
                    );
                }}
            </SquadContext.Consumer>
        </SquadProvider>
    );
});

export default index;
