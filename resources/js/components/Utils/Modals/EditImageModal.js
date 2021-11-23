import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { Modal, Container } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import Api from "../../Api";
import { comment } from "postcss";

const EditImageModal = withRouter((props) => {
    const appUrl = process.env.MIX_APP_URL;

    const [show, setShow] = useState(false);
    const [comments, setComments] = useState(null);
    const [error, setError] = useState("");
    const [description, setDescription] = useState(
        props.imageDetails.description ? props.imageDetails.description : ""
    );

    useEffect(() => {
        if (props.previewImageClicked !== 0) {
            setShow(true);
        }
    }, [props.previewImageClicked]);

    useEffect(() => {
        setDescription(props.imageDetails.description);
    }, [props.imageDetails]);

    const handleClose = () => setShow(false);

    console.log(props.imageDetails);

    const sendCommentHandler = async (e) => {
        e.preventDefault();

        if (!body) {
            setError("Comment required.");
            return;
        }

        if (body.length > 400) {
            setError("Comment must be less than 400 characters.");
            return;
        }

        if (props.userInfo.id === Number(props.match.params.id)) {
            setError("Cannot comment on your own post.");
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

    return (
        <div className="mt-5 text-center">
            <Container>
                <Modal show={show} onHide={handleClose} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{description}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="d-flex flex-wrap flex-column flex-md-row align-items-center">
                        <div>
                            <img
                                src={props.imageDetails.image}
                                alt={
                                    props.imageDetails.description
                                        ? props.imageDetails.description
                                        : "image"
                                }
                                className="img-fluid profile-img mr-5"
                            />
                        </div>
                        <div>
                            <input
                                className="mt-3 mr-2"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Leave a comment"
                            />
                            <input
                                type="submit"
                                value="Update Description"
                                className="bttn-material-flat bttn-sm update-account-modal-btn"
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="mr-auto">
                            {error && (
                                <span className="text-danger">{error}</span>
                            )}
                        </div>
                        <button
                            onClick={handleClose}
                            className="bttn-material-flat bttn-sm mr-2"
                        >
                            Cancel
                        </button>
                        <input
                            type="submit"
                            value="Delete Image"
                            className="bttn-material-flat bttn-sm bttn-danger"
                        />
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
});

export default EditImageModal;
