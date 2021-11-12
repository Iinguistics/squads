import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { Modal, Container } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import Api from "../../Api";
import { comment } from "postcss";

const ImageCommentModal = withRouter((props) => {
    const appUrl = process.env.MIX_APP_URL;

    const [show, setShow] = useState(false);
    const [comments, setComments] = useState(null);
    const [error, setError] = useState("");
    const [body, setBody] = useState("");

    const fetchComments = async () => {
        try {
            const { data } = await Api.get(
                `/get_image_comments/${props.imageDetails.image_id}`
            );
            setComments(data.data);
            setError("");
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        if (props.imageClicked !== 0) {
            setShow(true);
        }
        fetchComments();
    }, [props.imageClicked]);

    const handleClose = () => setShow(false);

    const renderCommentPhoto = (comment) => {
        const defaultPhoto = `${appUrl}/images/default-photo-black-outline.png`;
        if (comment.user[0]) {
            if (comment.user[0].profile.photo) {
                return comment.user[0].profile.photo;
            } else {
                return defaultPhoto;
            }
        }
    };

    const pushToCommenterProfile = (id) => {
        setShow(false);
        props.history.push(`/profile/${id}`);
    };

    const renderComments = () => {
        if (comments) {
            if (comments[0]) {
                return comments.map((comment) => {
                    return (
                        <div
                            className="d-flex flex-row ml-1 mr-2"
                            key={comment.image_comment_id}
                        >
                            <div className="item-1">
                                <img
                                    src={renderCommentPhoto(comment)}
                                    alt="photo"
                                    className="conversation-sidebar-photo mr-2 image-comment-photo"
                                    onClick={() =>
                                        pushToCommenterProfile(
                                            comment.user[0].id
                                        )
                                    }
                                />
                            </div>
                            <div className="item-2">
                                <span>{comment.user[0].username}</span>{" "}
                                <span className="text-muted conversation-message-time">
                                    <Moment
                                        date={comment.created_at}
                                        format="MM/DD/YYYY hh:mm:a"
                                    />
                                </span>
                                <p>{comment.body}</p>
                            </div>
                        </div>
                    );
                });
            } else {
                return (
                    <div>
                        <span className="text-muted">No Comments</span>
                    </div>
                );
            }
        }
    };

    const sendCommentHandler = async (e) => {
        e.preventDefault();

        if (body.length > 400) {
            setError("Comment must be less than 400 characters.");
            return;
        }

        if (props.userInfo.id === Number(props.match.params.id)) {
            setError("Cannot comment on your own post");
            setBody("");
            return;
        }

        try {
            let values = {
                image_id: props.imageDetails.image_id,
                body: body,
            };
            const { data } = await Api.post("/send_image_comment", values);

            if (data.success) {
                setBody("");
                setError("");
                fetchComments();
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    console.log(comments, "comments");
    console.log(props.userInfo, "userInfo");

    return (
        <div className="mt-5 text-center">
            <Container>
                <Modal show={show} onHide={handleClose} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {props.imageDetails.description
                                ? props.imageDetails.description
                                : ""}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="d-flex flex-wrap flex-column flex-md-row">
                        <img
                            src={props.imageDetails.image}
                            alt={
                                props.imageDetails.description
                                    ? props.imageDetails.description
                                    : "image"
                            }
                            className="img-fluid profile-img mr-5"
                        />
                        <div>
                            <div className="mt-3 mt-md-0 image-comment-container">
                                {renderComments()}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="mr-auto">
                            {error && (
                                <span className="text-danger">{error}</span>
                            )}
                            <form onSubmit={sendCommentHandler}>
                                <input
                                    className="mt-3 mr-3"
                                    type="text"
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    placeholder="Leave a comment"
                                />
                                <input
                                    type="submit"
                                    className="bttn-material-flat bttn-sm update-account-modal-btn"
                                />
                            </form>
                        </div>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
});

export default ImageCommentModal;
