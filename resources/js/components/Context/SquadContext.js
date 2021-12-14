import React, { createContext, useState } from "react";
import Api from "../Api";

export const SquadContext = createContext();

const SquadProvider = (props) => {
    const [isAdmin, setIsAdmin] = useState(null);

    const fetchIsAdmin = async (id) => {
        const { data } = await Api.get(`/check_is_admin/${id}`);
        setIsAdmin(data.data);
    };

    return (
        <SquadContext.Provider
            value={{
                isAdmin: isAdmin,
                fetchIsAdmin: fetchIsAdmin,
            }}
        >
            {props.children}
        </SquadContext.Provider>
    );
};

export default SquadProvider;
