import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Api from "../Api";
import CreateSquadModal from "../Utils/Modals/CreateSquadModal";
import ShowSquadInvitesModal from "../Utils/Modals/ShowSquadInvitesModal";
import SquadCard from "./SquadCard";
import { Fade } from "react-awesome-reveal";

const index = withRouter(() => {
    const [createSquadClicked, setCreateSquadClicked] = useState(0);
    const [showSquadInvitesClicked, setShowSquadInvitesClicked] = useState(0);
    const [mySquads, setMySquads] = useState(null);
    const [squadInvites, setSquadInvites] = useState(null);
    const [pendingInvites, setPendingInvites] = useState(false);

    const fetchMySquadsHandler = async () => {
        const { data } = await Api.get("/fetch_my_squads");
        setMySquads(data.data);
    };

    const fetchSquadInvitesHandler = async () => {
        const { data } = await Api.get("/fetch_squad_invites");
        setSquadInvites(data.data);
    };

    const checkPendingInvites = () => {
        if (squadInvites) {
            for (let invite of squadInvites) {
                if (invite.pending === 1) {
                    setPendingInvites(true);
                    return;
                } else {
                    setPendingInvites(false);
                    return;
                }
            }
        }
    };
    console.log(mySquads, "my squads");

    const renderPendingInvitesNotification = () => {
        if (pendingInvites) {
            return (
                <div className="pending-squad-invite-notification-bubble"></div>
            );
        }
    };

    useEffect(() => {
        fetchMySquadsHandler();
        fetchSquadInvitesHandler();
    }, []);

    useEffect(() => {
        checkPendingInvites();
    }, [squadInvites]);

    const createSquadClickedHandler = () => {
        setCreateSquadClicked((createSquadClicked) => createSquadClicked + 1);
    };

    const showSquadInvitesClickedHandler = () => {
        setShowSquadInvitesClicked(
            (showSquadInvitesClicked) => showSquadInvitesClicked + 1
        );
    };

    const renderSquadCards = () => {
        if (mySquads) {
            return mySquads.map((card, idx) => {
                return (
                    <div key={idx}>
                        <SquadCard card={card} />
                    </div>
                );
            });
        }
    };

    //console.log(squadInvites);

    return (
        <div className="container main-header">
            <div className="d-flex flex-column flex-wrap flex-md-row justify-content-around align-items-center shadow-sm p-3 mb-5 bg-white rounded">
                <Fade cascade>
                    <div className="item-1 mr-md-5 mb-5 mb-md-0">
                        search squad input
                    </div>
                    <div className="item-2 mb-5 mb-md-0">
                        <button
                            className="bttn-material-flat bttn-sm update-account-modal-btn"
                            onClick={createSquadClickedHandler}
                        >
                            Create Squad
                        </button>
                    </div>
                    <button
                        className="item-3 mb-5 mb-md-0 squad-invites-container bttn-material-flat bttn-sm"
                        onClick={showSquadInvitesClickedHandler}
                    >
                        Squad Invites {renderPendingInvitesNotification()}
                    </button>
                </Fade>
            </div>
            <CreateSquadModal
                createSquadClicked={createSquadClicked}
                fetchMySquadsHandler={fetchMySquadsHandler}
            />
            <ShowSquadInvitesModal
                showSquadInvitesClicked={showSquadInvitesClicked}
                squadInvites={squadInvites}
                fetchSquadInvitesHandler={fetchSquadInvitesHandler}
            />
            <div className="d-flex flex-column flex-wrap flex-md-row justify-content-around align-items-center">
                {renderSquadCards()}
            </div>
        </div>
    );
});

export default index;
