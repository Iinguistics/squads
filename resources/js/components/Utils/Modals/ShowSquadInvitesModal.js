import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { Modal, Container } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import Api from "../../Api";

const ShowSquadInvitesModal = withRouter((props) => {
    const appUrl = process.env.MIX_APP_URL;

    const [show, setShow] = useState(false);

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

    return (
        <div className="mt-5 text-center">
            <Container>
                <Modal show={show} onHide={handleClose} size="md">
                    <Modal.Header closeButton>
                        <Modal.Title>My Squads</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div
                                className={
                                    comments
                                        ? comments.length >= 4
                                            ? "mt-3 mt-md-0 image-comment-container"
                                            : "mt-3 mt-md-0"
                                        : "mt-3 mt-md-0"
                                }
                            >
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

export default ShowSquadInvitesModal;
