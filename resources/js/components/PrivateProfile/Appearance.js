import React from "react";
import { withRouter } from "react-router-dom";
import ChatPreview from "./ChatPreview";
//import ProfileUpdateForm from "../Utils/Forms/ProfileUpdateForm";

const Appearance = withRouter((props) => {
    return (
        <div className="container">
            <h1 className="text-center">Appearance</h1>
            <ChatPreview />
        </div>
    );
});

export default Appearance;
