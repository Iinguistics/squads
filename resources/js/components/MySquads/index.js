import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Api from "../Api";
import CreateSquadModal from "../Utils/Modals/CreateSquadModal";

const index = withRouter(() => {
    const [createSquadClicked, setCreateSquadClicked] = useState(0);

    const createSquadClickedHandler = () => {
        setCreateSquadClicked((createSquadClicked) => createSquadClicked + 1);
    };

    return (
        <div className="container main-header">
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center shadow-sm p-3 mb-5 bg-white rounded">
                <div className="item-1 mr-5">search squad input</div>
                <div className="item-2">
                    <button
                        className="bttn-material-flat bttn-sm update-account-modal-btn"
                        onClick={createSquadClickedHandler}
                    >
                        Create Squad
                    </button>
                </div>
            </div>
            <CreateSquadModal createSquadClicked={createSquadClicked} />
        </div>
    );
});

export default index;
