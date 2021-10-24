import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Api from "../../Api";
import SuccessModal from "./SuccessModal";

const UploadImageModal = withRouter((props) => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (props.imageClicked !== 0) {
            setShow(true);
        }
    }, [props.imageClicked]);

    const handleClose = () => {
        setShow(false);
    };

    const uploadImageHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const fData = new FormData();
            fData.append("image", selectedFile);
            fData.append("description", description);
            const { data } = await Api.post(
                "/upload_current_user_profile_image",
                fData
            );

            if (data.success) {
                setSuccess(true);
                setError(false);
                setShow(false);
                setLoading(false);
                props.fetchProfileHandler();
            } else {
                setSuccess(false);
                setError(true);
                setLoading(false);
            }
        } catch (error) {
            setError(error.message);
            setSuccess(false);
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
                    bodyText="Image has been added."
                    buttonText="Got it"
                    tabHandler={props.tabHandler}
                    tab="myProfile"
                    successReset={successReset}
                />
                <Modal
                    show={show}
                    onHide={handleClose}
                    className="account-modal"
                >
                    {loading && (
                        <div className="lds-hourglass d-flex justify-content-center m-auto"></div>
                    )}

                    <Modal.Header closeButton>
                        <Modal.Title>Upload image</Modal.Title>
                    </Modal.Header>
                    <form
                        // encType="multipart/form-data"
                        onSubmit={uploadImageHandler}
                    >
                        <Modal.Body>
                            <input
                                type="file"
                                id="form-input-no-underline"
                                onChange={(e) =>
                                    setSelectedFile(e.target.files[0])
                                }
                            />
                        </Modal.Body>
                        <Modal.Body>
                            <label htmlFor="desc">Description</label>{" "}
                            <span className="text-muted">(optional)</span>
                            <br />
                            <textarea
                                name="desc"
                                id="desc"
                                rows="4"
                                cols="33"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            {error && (
                                <span className="text-danger">{error}</span>
                            )}
                        </Modal.Body>
                    </form>
                    <Modal.Footer>
                        <button
                            onClick={handleClose}
                            className="bttn-material-flat bttn-sm mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            //type="submit"
                            onClick={uploadImageHandler}
                            className="bttn-material-flat bttn-sm update-account-modal-btn"
                            disabled={!selectedFile}
                        >
                            Upload
                        </button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
});

export default UploadImageModal;
