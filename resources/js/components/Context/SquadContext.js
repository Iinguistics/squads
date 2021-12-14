import React, { createContext, useState } from "react";
import Api from "../Api";

export const SquadContext = createContext();

const SquadProvider = (props) => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <SquadContext.Provider value={{}}>
            {props.children}
        </SquadContext.Provider>
    );
};

export default SquadProvider;
