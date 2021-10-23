import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Api from "../../Api";
import SuccessModal from "./SuccessModal";

const UploadPhotoModal = withRouter((props) => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (props.photoClicked !== 0) {
            setShow(true);
        }
    }, [props.photoClicked]);

    const handleClose = () => {
        setShow(false);
    };

    const updatePhotoHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const fData = new FormData();
            fData.append("photo", selectedFile);
            const { data } = await Api.post(
                "/update_current_user_profile_photo",
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

    return (
        <div className="mt-5 text-center">
            <Container>
                <SuccessModal
                    success={success}
                    titleText="Success"
                    bodyText="Your photo has been updated."
                    buttonText="Got it"
                    tabHandler={props.tabHandler}
                    tab="myProfile"
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
                        <Modal.Title>Update Photo</Modal.Title>
                    </Modal.Header>
                    <form
                        // encType="multipart/form-data"
                        onSubmit={updatePhotoHandler}
                    >
                        <Modal.Body>
                            <input
                                type="file"
                                id="form-input-no-underline"
                                //value={selectedFile}
                                onChange={(e) =>
                                    setSelectedFile(e.target.files[0])
                                }
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
                            onClick={updatePhotoHandler}
                            className="bttn-material-flat bttn-sm update-account-modal-btn"
                            disabled={!selectedFile}
                        >
                            Update
                        </button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
});

export default UploadPhotoModal;
