import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

const index = withRouter((props) => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        let userInfoData = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfoData) {
            props.history.push("/login");
        } else {
            setUserInfo(userInfoData);
        }
    }, []);

    return <div className="d-flex flex-column flex-md-row"></div>;
});

export default index;
