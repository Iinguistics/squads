import React, { useEffect, useState } from "react";

const Conversation = ({ conversationMessages, sentFromProfile }) => {
    const [messages, setMessages] = useState([]);

    const sortMessages = () => {
        let temp = [];
        if (conversationMessages) {
            if (conversationMessages[0]) {
                for (let message of conversationMessages[0]) {
                    temp.push(message);
                }
            }
            if (conversationMessages[1]) {
                for (let message of conversationMessages[1]) {
                    temp.push(message);
                }
            }
            temp.sort(function (a, b) {
                var keyA = new Date(a.updated_at),
                    keyB = new Date(b.updated_at);
                // Compare the 2 dates
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            });

            setMessages(temp);
        }
    };
    useEffect(() => {
        sortMessages();
    }, [conversationMessages]);

    console.log(conversationMessages, "convo");
    console.log(sentFromProfile, "sent from profile");
    console.log(messages, "messages");

    return (
        <div className="">
            <h2 className="text-center">Profile Preview</h2>
        </div>
    );
};

export default Conversation;
