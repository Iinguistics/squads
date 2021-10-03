import React from "react";
import { withRouter } from "react-router-dom";
import ProfileUpdateForm from "../Utils/Forms/ProfileUpdateForm";

const EditProfile = withRouter((props) => {
    return (
        <div className="container">
            <h1 className="text-center">General Info</h1>
            <p className="text-center">Add information about yourself</p>
            <p className="text-center text-muted">
                <small>All inputs are optional, add what you wish.</small>
            </p>
            <ProfileUpdateForm
                userInfo={props.userInfo}
                tabHandler={props.tabHandler}
                tab={props.tab}
            />
        </div>
    );
});

export default EditProfile;
