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

    // const fetchProfilePhotoHandler = async () => {
    //     setLoading(true);
    //     try {
    //         const { data } = await Api.get("/get_current_user_profile_photo");
    //         if (!data.success) {
    //             setPhotoPath(data);
    //             setLoading(false);
    //             setError("");
    //         } else {
    //             setError(data.error);
    //         }
    //     } catch (error) {
    //         setLoading(false);
    //         setError(error.message);
    //     }
    // };

    // useEffect(() => {
    //     fetchProfilePhotoHandler();
    // }, []);

    const updatePhotoHandler = async (e) => {
        e.preventDefault();

        try {
            let value = {
                photo: selectedFile,
            };
            const { data } = await Api.post(
                "/update_current_user_profile_photo",
                value
            );

            if (data.success) {
                setSuccess(true);
                setError(false);
                setShow(false);
            } else {
                setSuccess(false);
                setError(true);
            }
        } catch (error) {
            setError(error.message);
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
                    <Modal.Header closeButton>
                        <Modal.Title>Update Photo</Modal.Title>
                    </Modal.Header>
                    <form
                        onSubmit={updatePhotoHandler}
                        enctype="multipart/form-data"
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
                        <Modal.Footer>
                            <button
                                onClick={handleClose}
                                className="bttn-material-flat bttn-sm mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bttn-material-flat bttn-sm update-account-modal-btn"
                            >
                                Update
                            </button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </Container>
        </div>
    );
});

export default UploadPhotoModal;
