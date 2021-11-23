import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Head from "../ProfileComponents/Head";
import InternetAndSquadInfo from "../ProfileComponents/InternetAndSquadInfo";
import Images from "../ProfileComponents/Images";
import Api from "../Api";
import { ALL, TEAMMATES, NONE } from "../PrivateProfile/Privacy/Types";

const index = withRouter((props) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [userInfo, setUserInfo] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [profileColor, setProfileColor] = useState("");
    const [isTeammate, setIsTeammate] = useState(null);
    const [profileViewable, setProfileViewable] = useState(false);
    const [privacyViewableString, setPrivacyViewableString] = useState("");
    const [profileMessagable, setProfileMessagable] = useState(true);
    const [profileInvite, setProfileInvite] = useState(true);
    const [privacyNone, setPrivacyNone] = useState(false);

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
        const { data } = await Api.get(
            `/check_squad_teammate/${props.match.params.id}`
        );
        setIsTeammate(data.data);
    };

    const checkProfileViewing = () => {
        if (profileData.id === userInfo.id) {
            setProfileViewable(true);
            return;
        }

        if (profileData.privacy_profile_viewing === ALL) {
            setProfileViewable(true);
            return;
        }

        if (
            profileData.privacy_profile_viewing === TEAMMATES &&
            isTeammate === true
        ) {
            setProfileViewable(true);
            return;
        }

        if (profileData.privacy_profile_viewing === NONE) {
            setPrivacyViewableString("This profile is set to private");
            return;
        }

        if (
            profileData.privacy_profile_viewing === TEAMMATES &&
            isTeammate === false
        ) {
            setPrivacyViewableString(
                `Only teammates of ${profileData.user.username} can view their profile`
            );
            return;
        }
    };

    const checkProfileMessaging = () => {
        if (
            profileData.privacy_messaging === NONE &&
            profileData.id !== userInfo.id
        ) {
            setProfileMessagable(false);
            setPrivacyNone(true);
        }

        if (
            profileData.privacy_messaging === TEAMMATES &&
            profileData.id !== userInfo.id &&
            isTeammate === false
        ) {
            setProfileMessagable(false);
        }
    };

    const checkProfileInvite = () => {
        if (
            profileData.privacy_squad_invite === NONE &&
            profileData.id !== userInfo.id
        ) {
            setProfileInvite(false);
            setPrivacyNone(true);
        }
    };

    useEffect(() => {
        checkIfTeammate();

        setTimeout(() => {
            if (profileData) {
                //profile viewing
                checkProfileViewing();

                //profile messaging
                checkProfileMessaging();

                //profile invites
                checkProfileInvite();
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
                        profileInvite={profileInvite}
                        privacyNone={privacyNone}
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
                        profileInvite={profileInvite}
                        privacyNone={privacyNone}
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
