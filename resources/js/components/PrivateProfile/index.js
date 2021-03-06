import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import ProfileSideBar from "./ProfileSideBar";
import PrivateProfileProvider, {
    PrivateProfileContext,
} from "../Context/PrivateProfileContext";
import UserProvider, { UserContext } from "../Context/UserContext";

import Appearance from "./Appearance";
import EditProfile from "./EditProfile";
import Privacy from "./Privacy";
import MyProfilePreview from "./MyProfilePreview";

const index = withRouter((props) => {
    const [userInfo, setUserInfo] = useState(null);
    // chrome does not store cookies in local host env?
    //console.log(document.cookie.indexOf("jwt="), "cookie");

    useEffect(() => {
        let userInfoData = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfoData) {
            props.history.push("/login");
        } else {
            setUserInfo(userInfoData);
        }
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
                                    usernameClickedHandler,
                                    usernameClicked,
                                    gamertagClickedHandler,
                                    gamertagClicked,
                                    activisionClickedHandler,
                                    activisionClicked,
                                    passwordClickedHandler,
                                    passwordClicked,
                                    photoClickedHandler,
                                    photoClicked,
                                    fetchPrivateProfileHandler,
                                    profileData,
                                    fontColorHandler,
                                    fontColor,
                                    profileColorHandler,
                                    profileColor,
                                    imageClickedHandler,
                                    imageClicked,
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
                                                    usernameClickedHandler={
                                                        usernameClickedHandler
                                                    }
                                                    usernameClicked={
                                                        usernameClicked
                                                    }
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
                                                    photoClickedHandler={
                                                        photoClickedHandler
                                                    }
                                                    photoClicked={photoClicked}
                                                    fetchPrivateProfileHandler={
                                                        fetchPrivateProfileHandler
                                                    }
                                                    imageClickedHandler={
                                                        imageClickedHandler
                                                    }
                                                    imageClicked={imageClicked}
                                                />
                                                <div className="container main-header">
                                                    {myProfileTab && (
                                                        <MyProfilePreview
                                                            userInfo={userInfo}
                                                            tabHandler={
                                                                tabHandler
                                                            }
                                                            tab="myProfile"
                                                            fetchPrivateProfileHandler={
                                                                fetchPrivateProfileHandler
                                                            }
                                                            profileData={
                                                                profileData
                                                            }
                                                            profileColor={
                                                                profileColor
                                                            }
                                                        />
                                                    )}
                                                    {generalInfoTab && (
                                                        <EditProfile
                                                            userInfo={userInfo}
                                                            tabHandler={
                                                                tabHandler
                                                            }
                                                            tab="myProfile"
                                                        />
                                                    )}
                                                    {appearanceTab && (
                                                        <Appearance
                                                            userInfo={userInfo}
                                                            tabHandler={
                                                                tabHandler
                                                            }
                                                            fetchPrivateProfileHandler={
                                                                fetchPrivateProfileHandler
                                                            }
                                                            profileData={
                                                                profileData
                                                            }
                                                            fontColorHandler={
                                                                fontColorHandler
                                                            }
                                                            fontColor={
                                                                fontColor
                                                            }
                                                            tabHandler={
                                                                tabHandler
                                                            }
                                                            profileColorHandler={
                                                                profileColorHandler
                                                            }
                                                            profileColor={
                                                                profileColor
                                                            }
                                                        />
                                                    )}
                                                    {privacyTab && (
                                                        <Privacy
                                                            userInfo={userInfo}
                                                            tabHandler={
                                                                tabHandler
                                                            }
                                                            fetchPrivateProfileHandler={
                                                                fetchPrivateProfileHandler
                                                            }
                                                            profileData={
                                                                profileData
                                                            }
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
