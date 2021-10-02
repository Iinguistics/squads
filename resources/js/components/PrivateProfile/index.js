import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import ProfileSideBar from "./ProfileSideBar";
import PrivateProfileProvider, {
    PrivateProfileContext,
} from "../Context/PrivateProfileContext";

const index = withRouter((props) => {
    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo) {
            props.history.push("/login");
        }
        console.log(userInfo);
    }, []);
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
                }) => {
                    return (
                        <>
                            <div className="d-flex flex-column flex-md-row private-profile-main-container">
                                <ProfileSideBar
                                    tabHandler={tabHandler}
                                    myProfileTab={myProfileTab}
                                    generalInfoTab={generalInfoTab}
                                    uploadPhotoTab={uploadPhotoTab}
                                    privacyTab={privacyTab}
                                    appearanceTab={appearanceTab}
                                    emailTab={emailTab}
                                    gamertagTab={gamertagTab}
                                    activisionIdTab={activisionIdTab}
                                    passwordTab={passwordTab}
                                />
                                <div className="container mt-5 main-header">
                                    <h1 className="text-center">
                                        Private Profile
                                    </h1>
                                </div>
                            </div>
                        </>
                    );
                }}
            </PrivateProfileContext.Consumer>
        </PrivateProfileProvider>
    );
});

export default index;
