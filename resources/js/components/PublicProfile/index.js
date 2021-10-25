import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Head from "../ProfileComponents/Head";
import InternetAndSquadInfo from "../ProfileComponents/InternetAndSquadInfo";
import Images from "../ProfileComponents/Images";
import Api from "../Api";

const index = withRouter((props) => {
    const [userInfo, setUserInfo] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [profileColor, setProfileColor] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const fetchProfileHandler = async () => {
        try {
            const { data } = await Api.get(`/profile/${props.match.params.id}`);
            if (data.success) {
                setProfileData(data.data[0]);
                setProfileColor(data.data[0].profile_color);
                setError("");
            } else {
                setError("Profile does not exist");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        let userInfoData = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfoData) {
            props.history.push("/login");
        } else {
            setUserInfo(userInfoData);
        }

        fetchProfileHandler();
    }, []);

    console.log(profileData, "data from public");
    return (
        <div className="container main-header mt-5">
            <Head profileData={profileData} profileColor={profileColor} />
            <InternetAndSquadInfo profileData={profileData} />
            <Images profileData={profileData} />
        </div>
    );
});

export default index;
