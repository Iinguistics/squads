import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Api from "../Api";
import ViewRoster from "../Utils/Modals/ViewRosterModal";

const Head = withRouter(({ match, squad, isAdmin, fetchIsAdmin }) => {
    const [viewRosterClicked, setViewRosterClicked] = useState(0);

    const viewRosterClickedHandler = () => {
        setViewRosterClicked((viewRosterClicked) => viewRosterClicked + 1);
    };

    useEffect(() => {
        fetchIsAdmin(match.params.id);
    }, []);

    const renderAdminButton = () => {
        if (isAdmin) {
            return (
                <div>
                    <Link to={`/squad/${match.params.id}/admin`}>
                        <button className="bttn-slant bttn-sm bttn-primary">
                            Admin Portal
                        </button>
                    </Link>
                </div>
            );
        }
    };
    return (
        <>
            <div className="d-flex flex-column flex-wrap flex-md-row justify-content-around align-items-center shadow-sm p-3 mb-5 bg-white rounded">
                <div>
                    <button
                        className="bttn-slant bttn-sm bttn-primary"
                        onClick={viewRosterClickedHandler}
                    >
                        View Roster
                    </button>
                </div>
                <div className="my-5 my-md-0">item 2</div>
                {renderAdminButton()}
            </div>
            <ViewRoster squad={squad} viewRosterClicked={viewRosterClicked} />
        </>
    );
});

export default Head;
