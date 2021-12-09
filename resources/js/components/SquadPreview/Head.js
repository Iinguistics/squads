import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";

const Head = withRouter(({ squad }) => {
    const appUrl = process.env.MIX_APP_URL;

    const [foundId, setFounderId] = useState("");

    const fetchFounderId = () => {
        if (squad) {
            if (squad.squad_members) {
                for (let member of squad.squad_members) {
                    if (member.username === squad.founder) {
                        setFounderId(member.id);
                        break;
                    }
                }
            }
        }
    };

    useEffect(() => {
        fetchFounderId();
    }, [squad]);

    const renderHead = () => {
        if (squad) {
            return (
                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center shadow-sm p-3 mb-5 bg-white rounded">
                    <div className="item-1 mr-5">
                        <img
                            src={
                                squad
                                    ? squad.photo
                                        ? squad.photo
                                        : `${appUrl}/images/default-photo-black-outline.png`
                                    : `${appUrl}/images/default-photo-black-outline.png`
                            }
                            alt="profile photo"
                            className="profile-preview-photo"
                        />
                    </div>
                    <div className="private-profile-preview-head-item-2 mt-2 mt-md-0">
                        <span className="mr-3 fs-22">{squad.squad_name}</span>
                        <div className="fs-16 mt-3 mt-md-0">
                            <span>Members: {squad.members.length}</span>
                            <br />
                            <span>Game: {squad.game}</span>
                            <br />
                            <span>
                                Founder:{" "}
                                <Link to={`/profile/${foundId}`}>
                                    {squad.founder}
                                </Link>
                            </span>
                            <br />
                            <span>
                                Currently Recruiting:{" "}
                                {squad.recruiting === 1 ? "Yes" : "No"}
                            </span>
                            <br />
                            <p>
                                Bio: {squad.bio ? squad.bio : "No bio provided"}
                            </p>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="lds-hourglass d-flex justify-content-center m-auto"></div>
            );
        }
    };
    return <>{renderHead()}</>;
});

export default Head;