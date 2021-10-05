import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import ProfileSideBar from "./ProfileSideBar";
import PrivateProfileProvider, {
    PrivateProfileContext,
} from "../Context/PrivateProfileContext";
import UserProvider, { UserContext } from "../Context/UserContext";

import EditProfile from "./EditProfile";

const index = withRouter((props) => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        let userInfoData = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfoData) {
            props.history.push("/login");
        } else {
            setUserInfo(userInfoData);
        }

        console.log(userInfoData);
    }, []);
    return (
        <UserProvider>
            <UserContext.Consumer>
                {({ loggedInToggleHandler }) => {
                    return (
                        <PrivateProfileProvider>
                            <PrivateProfileContext.Consumer>
                                {({
                                    myProfileTab,
                                    generalInfoTab,
                                    uploadPhotoTab,
                                    privacyTab,
                                    appearanceTab,
                                    emailTab,
                                    gamertagTab,
                                    activisionIdTab,
                                    passwordTab,
                                    tabHandler,
                                    deleteAccountClickedHandler,
                                    deleteAccountClicked,
                                    emailClickedHandler,
                                    emailClicked,
                                    gamertagClickedHandler,
                                    gamertagClicked,
                                    activisionClickedHandler,
                                    activisionClicked,
                                    passwordClickedHandler,
                                    passwordClicked,
                                }) => {
                                    return (
                                        <>
                                            <div className="d-flex flex-column flex-md-row private-profile-main-container">
                                                <ProfileSideBar
                                                    tabHandler={tabHandler}
                                                    myProfileTab={myProfileTab}
                                                    generalInfoTab={
                                                        generalInfoTab
                                                    }
                                                    uploadPhotoTab={
                                                        uploadPhotoTab
                                                    }
                                                    privacyTab={privacyTab}
                                                    appearanceTab={
                                                        appearanceTab
                                                    }
                                                    emailTab={emailTab}
                                                    gamertagTab={gamertagTab}
                                                    activisionIdTab={
                                                        activisionIdTab
                                                    }
                                                    passwordTab={passwordTab}
                                                    deleteAccountClickedHandler={
                                                        deleteAccountClickedHandler
                                                    }
                                                    deleteAccountClicked={
                                                        deleteAccountClicked
                                                    }
                                                    loggedInToggleHandler={
                                                        loggedInToggleHandler
                                                    }
                                                    emailClickedHandler={
                                                        emailClickedHandler
                                                    }
                                                    emailClicked={emailClicked}
                                                    gamertagClickedHandler={
                                                        gamertagClickedHandler
                                                    }
                                                    gamertagClicked={
                                                        gamertagClicked
                                                    }
                                                    activisionClickedHandler={
                                                        activisionClickedHandler
                                                    }
                                                    activisionClicked={
                                                        activisionClicked
                                                    }
                                                    passwordClickedHandler={
                                                        passwordClickedHandler
                                                    }
                                                    passwordClicked={
                                                        passwordClicked
                                                    }
                                                />
                                                <div className="container mt-5 main-header">
                                                    {generalInfoTab && (
                                                        <EditProfile
                                                            userInfo={userInfo}
                                                            tabHandler={
                                                                tabHandler
                                                            }
                                                            tab="myProfile"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    );
                                }}
                            </PrivateProfileContext.Consumer>
                        </PrivateProfileProvider>
                    );
                }}
            </UserContext.Consumer>
        </UserProvider>
    );
});

export default index;
