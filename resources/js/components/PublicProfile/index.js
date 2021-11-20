import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Head from "../ProfileComponents/Head";
import InternetAndSquadInfo from "../ProfileComponents/InternetAndSquadInfo";
import Images from "../ProfileComponents/Images";
import Api from "../Api";
import { TEAMMATES, NONE } from "../PrivateProfile/Privacy/Types";

const index = withRouter((props) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [userInfo, setUserInfo] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [profileColor, setProfileColor] = useState("");
    const [isTeammate, setIsTeammate] = useState(null);
    const [profileViewable, setProfileViewable] = useState(true);
    const [privacyViewableString, setPrivacyViewableString] = useState("");
    const [profileMessagable, setProfileMessagable] = useState(true);
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

    useEffect(() => {
        checkIfTeammate();

        setTimeout(() => {
            if (profileData) {
                //profile viewing
                checkProfileViewing();

                //profile messaging
                checkProfileMessaging();
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
