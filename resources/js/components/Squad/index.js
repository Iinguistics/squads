import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Api from "../Api";
import SquadProvider, { SquadContext } from "../Context/SquadContext";
import Banner from "./Banner";
import Head from "./Head";

const index = withRouter((props) => {
    const [squad, setSquad] = useState(null);
    const [isMember, setIsMember] = useState(null);
    const [verifyingMembership, setVerifyingMembership] = useState(true);
    let userInfoData = JSON.parse(localStorage.getItem("userInfo"));

    const fetchSquadHandler = async () => {
        const { data } = await Api.get(`/fetch_squad/${props.match.params.id}`);
        setSquad(data.data);
    };

    const checkIfMember = () => {
        if (squad) {
            for (let i = 0; i < squad.members.length; i++) {
                if (squad.members[i].id === userInfoData.id) {
                    setIsMember(true);
                    setVerifyingMembership(false);
                    return;
                }
            }
            setIsMember(false);
            props.history.push(`/squad/preview/${squad.squad_id}`);
        }
    };

    useEffect(() => {
        if (!userInfoData) {
            props.history.push("/login");
        }
        fetchSquadHandler();
    }, []);

    useEffect(() => {
        checkIfMember();
    }, [squad]);

    console.log(squad, "squad");

    const renderSquadPage = () => {
        if (verifyingMembership) {
            return (
                <div className="lds-hourglass d-flex justify-content-center m-auto"></div>
            );
        } else {
            return (
                <SquadProvider>
                    <SquadContext.Consumer>
                        {({ isAdmin, fetchIsAdmin }) => {
                            return (
                                <div className="container main-header">
                                    <Banner squad={squad} />
                                    <Head
                                        squad={squad}
                                        isAdmin={isAdmin}
                                        fetchIsAdmin={fetchIsAdmin}
                                    />
                                </div>
                            );
                        }}
                    </SquadContext.Consumer>
                </SquadProvider>
            );
        }
    };

    return <>{renderSquadPage()}</>;
});

export default index;
