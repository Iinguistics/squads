import React, { useEffect, useState, useRef } from "react";
import Api from "../Api";
import Moment from "react-moment";
import { FiSend } from "react-icons/fi";

const Conversation = ({
    conversationMessages,
    sentFromProfile,
    profileData,
    sentFromUsername,
    fetchConversationMessages,
}) => {
    const appUrl = process.env.MIX_APP_URL;

    const ScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };

    const [messages, setMessages] = useState([]);
    const [body, setBody] = useState("");
    const [error, setError] = useState("");

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

            temp.sort((a, b) => {
                return new Date(a.created_at) - new Date(b.created_at);
            });

            setMessages(temp);
        }
    };
    useEffect(() => {
        sortMessages();
    }, [conversationMessages]);

    const renderMessagePhoto = (message) => {
        const defaultPhoto = `${appUrl}/images/default-photo-black-outline.png`;
        if (message.sent_from_id === profileData.id) {
            if (profileData.photo) {
                return profileData.photo;
            } else {
                return defaultPhoto;
            }
        } else {
            if (sentFromProfile.photo) {
                return sentFromProfile.photo;
            } else {
                return defaultPhoto;
            }
        }
    };

    const renderMessages = () => {
        if (messages) {
            return messages.map((message) => {
                return (
                    <div
                        className="d-flex flex-row ml-1 mr-2"
                        key={message.message_id}
                    >
                        <div className="item-1">
                            <img
                                src={renderMessagePhoto(message)}
                                alt="photo"
                                className="conversation-sidebar-photo mr-2"
                            />
                        </div>
                        <div className="item-2">
                            <span>{message.sent_from_username}</span>{" "}
                            <span className="text-muted conversation-message-time">
                                <Moment
                                    date={message.created_at}
                                    format="MM/DD/YYYY hh:mm:a"
                                />
                            </span>
                            <p>{message.body}</p>
                        </div>
                        <ScrollToBottom />
                    </div>
                );
            });
        }
    };

    const sendMessageHandler = async (e) => {
        e.preventDefault();

        if (!body) {
            setError("Message required.");
            return;
        }

        if (body.length > 455) {
            setError("Message must be less than 455 characters.");
            return;
        }

        try {
            let values = {
                id: sentFromProfile.id,
                body: body,
            };
            const { data } = await Api.post("/send_user_message", values);

            if (data.success) {
                setBody("");
                setError("");
                fetchConversationMessages(sentFromProfile.id);
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="conversation-input">
            <div className="conversation-messages-container">
                {renderMessages()}
            </div>
            {error && <span className="text-danger">{error}</span>}
            <form
                onSubmit={sendMessageHandler}
                className="conversation-input-form"
            >
                <input
                    className="mt-5"
                    type="text"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder={`Message @${sentFromUsername}`}
                    disabled={!conversationMessages}
                />
            </form>
        </div>
    );
};

export default Conversation;
