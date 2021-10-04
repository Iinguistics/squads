import React, { createContext, useState } from "react";
import Api from "../Api";

export const PrivateProfileContext = createContext();

const PrivateProfileProvider = (props) => {
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
                tabHandler,
                deleteAccountClickedHandler,
            }}
        >
            {props.children}
        </PrivateProfileContext.Provider>
    );
};

export default PrivateProfileProvider;
