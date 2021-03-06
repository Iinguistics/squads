import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Api from "../../Api";
import SuccessModal from "./SuccessModal";

const EditImageModal = withRouter((props) => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [description, setDescription] = useState(
        props.imageDetails.description ? props.imageDetails.description : ""
    );

    const [modalBodyText, setModalBodyText] = useState("");

    useEffect(() => {
        if (props.previewImageClicked !== 0) {
            setShow(true);
        }
    }, [props.previewImageClicked]);

    useEffect(() => {
        setDescription(props.imageDetails.description);
    }, [props.imageDetails]);

    const handleClose = () => setShow(false);

    const updateImageDescriptionHandler = async () => {
        if (!description) {
            setError("Comment required.");
            return;
        }

        if (description.length > 299) {
            setError("Description must be less than 300 characters.");
            return;
        }

        try {
            let values = {
                image_id: props.imageDetails.image_id,
                description: description,
            };
            const { data } = await Api.put("/update_image_description", values);

            if (data.success) {
                props.fetchPrivateProfileHandler();
                setSuccess(true);
                setDescription("");
                setModalBodyText("Image description has been updated");
                setError("");
                setShow(false);
            } else {
                setSuccess(false);
                setError(data.error);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const deleteImageHandler = async () => {
        try {
            setLoading(true);

            let value = {
                image_id: props.imageDetails.image_id,
            };
            const { data } = await Api.post("/destroy_image", value);

            if (data.success) {
                props.fetchPrivateProfileHandler();
                setSuccess(true);
                setLoading(false);
                setDescription("");
                setModalBodyText("Image has been deleted");
                setError("");
                setShow(false);
            } else {
                setSuccess(false);
                setError(data.error);
                setLoading(false);
            }
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const successReset = () => {
        setSuccess(false);
    };

    return (
        <div className="mt-5 text-center">
            <Container>
                <SuccessModal
                    success={success}
                    titleText="Success"
                    bodyText={modalBodyText}
                    buttonText="Got it"
                    successReset={successReset}
                />
                <Modal show={show} onHide={handleClose} size="lg" centered>
                    {loading && (
                        <div className="lds-hourglass d-flex justify-content-center m-auto"></div>
                    )}

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
                                placeholder="Leave a description"
                            />
                            <input
                                type="submit"
                                value="Update Description"
                                className="bttn-material-flat bttn-sm update-account-modal-btn"
                                onClick={updateImageDescriptionHandler}
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
                            onClick={deleteImageHandler}
                        />
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
});

export default EditImageModal;
