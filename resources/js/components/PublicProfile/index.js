import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Head from "../ProfileComponents/Head";
import InternetAndSquadInfo from "../ProfileComponents/InternetAndSquadInfo";
import Images from "../ProfileComponents/Images";
import Api from "../Api";
import { ALL, TEAMMATES, NONE } from "../PrivateProfile/Privacy/Types";

const index = withRouter((props) => {
    const [userInfo, setUserInfo] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [profileColor, setProfileColor] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isTeammate, setIsTeammate] = useState(null);
    const [profileViewable, setProfileViewable] = useState(true);
    const [privacyViewableString, setPrivacyViewableString] = useState("");
    const [profileMessagable, setProfileMessageable] = useState(true);
    const [privacyMessagableString, setPrivacyMessagableString] = useState("");

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

    const checkIfTeammate = async () => {
        const { data } = await Api.get(`/check_squad_teammate/12`);
        setIsTeammate(data.data);
    };
    console.log(isTeammate);

    useEffect(() => {
        checkIfTeammate();

        setTimeout(() => {
            // to do...put another if statement right below the first
            // check if set to teammates only & if the userInfo.id is part of the same squd if not set to false
            if (profileData) {
                //profile viewing
                if (
                    profileData.privacy_profile_viewing === NONE &&
                    profileData.id !== userInfo.id
                ) {
                    setPrivacyViewableString("This profile is set to private");
                    setProfileViewable(false);
                }

                if (
                    profileData.privacy_profile_viewing === TEAMMATES &&
                    profileData.id !== userInfo.id &&
                    isTeammate === false
                ) {
                    setPrivacyViewableString(
                        `Only teammates of ${profileData.user.username} can view their profile`
                    );
                    setProfileViewable(false);
                }

                //profile messaging
                if (
                    profileData.privacy_profile_messaging === NONE &&
                    profileData.id !== userInfo.id
                ) {
                    setProfileMessageable(false);
                    setPrivacyMessagableString(
                        `${profileData.user.username} is not accepting messages at this time`
                    );
                }

                if (
                    profileData.privacy_profile_messaging === TEAMMATES &&
                    profileData.id !== userInfo.id &&
                    isTeammate === false
                ) {
                    setProfileMessageable(false);
                    setPrivacyMessagableString(
                        `Only teammates of ${profileData.user.username} can send them messages`
                    );
                }
            }
        });
    }, [profileData, isTeammate]);

    const renderProfile = () => {
        if (profileViewable) {
            return (
                <>
                    <Head
                        profileData={profileData}
                        profileColor={profileColor}
                        userInfo={userInfo}
                        profileMessagable={profileMessagable}
                    />
                    <InternetAndSquadInfo profileData={profileData} />
                    <Images profileData={profileData} userInfo={userInfo} />
                </>
            );
        } else {
            return (
                <>
                    <Head
                        profileData={profileData}
                        profileColor={profileColor}
                        userInfo={userInfo}
                        profileMessagable={profileMessagable}
                    />
                    <span className="text-muted d-flex justify-content-center">
                        {privacyViewableString}
                    </span>
                </>
            );
        }
    };

    return <div className="container main-header mt-5">{renderProfile()}</div>;
});

export default index;
