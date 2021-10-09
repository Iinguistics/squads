import React, { createContext, useState } from "react";
import Api from "../Api";

export const PrivateProfileContext = createContext();

const PrivateProfileProvider = (props) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [profileData, setProfileData] = useState(null);

    const [myProfileTab, setMyProfileTab] = useState(true);
    const [generalInfoTab, setGeneralInfoTab] = useState(false);
    const [uploadPhotoTab, setUploadPhotoTab] = useState(false);
    const [privacyTab, setPrivacyTab] = useState(false);
    const [appearanceTab, setAppearanceTab] = useState(false);
    const [emailTab, setEmailTab] = useState(false);
    const [gamertagTab, setGamertagTab] = useState(false);
    const [activisionIdTab, setActivisionIdTab] = useState(false);
    const [passwordTab, setPasswordTab] = useState(false);

    const [deleteAccountClicked, setDeleteAccountClicked] = useState(0);
    const [emailClicked, setEmailClicked] = useState(0);
    const [gamertagClicked, setGamertagClicked] = useState(0);
    const [activisionClicked, setActivisionClicked] = useState(0);
    const [passwordClicked, setPasswordClicked] = useState(0);

    const [fontColor, setFontColor] = useState("");
    const [profileColor, setProfileColor] = useState("");

    const resetTabs = () => {
        setMyProfileTab(false);
        setGeneralInfoTab(false);
        setUploadPhotoTab(false);
        setPrivacyTab(false);
        setAppearanceTab(false);
        setEmailTab(false);
        setGamertagTab(false);
        setActivisionIdTab(false);
        setPasswordTab(false);
    };

    const tabHandler = (tab) => {
        switch (tab) {
            case "myProfile":
                resetTabs();
                setMyProfileTab(true);
                break;
            case "generalInfo":
                resetTabs();
                setGeneralInfoTab(true);
                break;
            case "uploadPhoto":
                resetTabs();
                setUploadPhotoTab(true);
                break;
            case "privacy":
                resetTabs();
                setPrivacyTab(true);
                break;
            case "appearance":
                resetTabs();
                setAppearanceTab(true);
                break;
            case "email":
                resetTabs();
                setEmailTab(true);
                break;
            case "gamertag":
                resetTabs();
                setGamertagTab(true);
                break;
            case "activisionId":
                resetTabs();
                setActivisionIdTab(true);
                break;
            case "password":
                resetTabs();
                setPasswordTab(true);
                break;

            default:
                break;
        }
    };

    const deleteAccountClickedHandler = () => {
        setDeleteAccountClicked(
            (deleteAccountClicked) => deleteAccountClicked + 1
        );
    };

    const emailClickedHandler = () => {
        setEmailClicked((emailClicked) => emailClicked + 1);
    };

    const gamertagClickedHandler = () => {
        setGamertagClicked((gamertagClicked) => gamertagClicked + 1);
    };

    const activisionClickedHandler = () => {
        setActivisionClicked((activisionClicked) => activisionClicked + 1);
    };

    const passwordClickedHandler = () => {
        setPasswordClicked((passwordClicked) => passwordClicked + 1);
    };

    const fontColorHandler = (color) => {
        setFontColor(color);
    };

    const profileColorHandler = (color) => {
        setProfileColor(color);
    };

    const fetchProfileHandler = async () => {
        try {
            const { data } = await Api.get("/show_current_user_profile");
            if (data.success) {
                setProfileData(data.data[0]);
                setError("");
                setFontColor(data.data[0].font_color);
                setProfileColor(data.data[0].profile_color);
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <PrivateProfileContext.Provider
            value={{
                myProfileTab,
                generalInfoTab,
                uploadPhotoTab,
                privacyTab,
                appearanceTab,
                emailTab,
                gamertagTab,
                activisionIdTab,
                passwordTab,
                deleteAccountClicked,
                emailClicked,
                gamertagClicked,
                activisionClicked,
                passwordClicked,
                profileData,
                fontColor,
                profileColor,
                tabHandler,
                deleteAccountClickedHandler,
                emailClickedHandler,
                gamertagClickedHandler,
                activisionClickedHandler,
                passwordClickedHandler,
                fetchProfileHandler,
                fontColorHandler,
                profileColorHandler,
            }}
        >
            {props.children}
        </PrivateProfileContext.Provider>
    );
};

export default PrivateProfileProvider;
