import React, { useEffect, useState } from "react";

const Conversation = ({ conversationMessages, sentFromProfile }) => {
    useEffect(() => {}, []);

    console.log(conversationMessages, "convo");
    console.log(sentFromProfile, "sent from profile");

    return (
        <div className="">
            <h2 className="text-center">Profile Preview</h2>
        </div>
    );
};

export default Conversation;
