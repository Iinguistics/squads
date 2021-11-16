import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Head from "../ProfileComponents/Head";
import InternetAndSquadInfo from "../ProfileComponents/InternetAndSquadInfo";
import Images from "../ProfileComponents/Images";
import Api from "../Api";
import { ALL, TEAMMATES, NONE } from "../PrivateProfile/Privacy/Types";
import PrivacyModal from "../Utils/Modals/PrivacyModal";

const index = withRouter((props) => {
    const [userInfo, setUserInfo] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [profileColor, setProfileColor] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [profileViewing, setProfileViewing] = useState("");
    const [profileViewable, setProfileViewable] = useState(true);

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
    }, [props.match.params.id]);
    console.log(profileData, "profile Data");
    console.log(userInfo, "user info");

    useEffect(() => {
        // to do...put another if statement right below the first
        // check if set to teammates only & if the userInfo.id is part of the same squd if not set to false
        if (profileData) {
            if (
                profileData.privacy_profile_viewing === NONE &&
                profileData.id !== userInfo.id
            ) {
                setProfileViewable(false);
            }
        }
    }, [profileData]);

    const renderProfile = () => {
        if (profileData) {
            if (profileData.privacy_profile_viewing === ALL) {
                return (
                    <>
                        <Head
                            profileData={profileData}
                            profileColor={profileColor}
                            userInfo={userInfo}
                        />
                        <InternetAndSquadInfo profileData={profileData} />
                        <Images profileData={profileData} userInfo={userInfo} />
                    </>
                );
            }
        }
    };

    return (
        <div className="container main-header mt-5">
            {renderProfile()}
            <PrivacyModal
                profileViewable={profileViewable}
                profileData={profileData}
            />
        </div>
    );
});

export default index;
