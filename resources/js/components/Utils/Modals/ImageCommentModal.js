import React, { useState, useEffect } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Api from "../../Api";

const ImageCommentModal = withRouter((props) => {
    const [show, setShow] = useState(false);
    const [comments, setComments] = useState(null);
    const [error, setError] = useState("");
    const [body, setBody] = useState("");

    const fetchComments = async () => {
        try {
            const { data } = await Api.get(
                `/get_image_comments/${props.imageDetails.image_id}`
            );
            setComments(data);
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

    const renderComments = () => {
        if (comments) {
            return comments.map((comment) => {
                return "";
            });
        }
    };

    const sendCommentHandler = async (e) => {
        e.preventDefault();

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
                fetchComments();
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    console.log(props.imageDetails);

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
                    <Modal.Body>
                        <img
                            src={props.imageDetails.image}
                            alt={
                                props.imageDetails.description
                                    ? props.imageDetails.description
                                    : "image"
                            }
                            className="img-fluid profile-img"
                        />
                        <span>No comments</span>
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
