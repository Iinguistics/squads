import React, { useState, useEffect } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Api from "../../Api";

const ImageCommentModal = withRouter((props) => {
    const [show, setShow] = useState(false);
    const [comments, setComments] = useState(null);

    useEffect(() => {
        if (props.imageClicked !== 0) {
            setShow(true);
        }
    }, [props.imageClicked]);

    const handleClose = () => setShow(false);

    const logOutHandler = async () => {
        const { data } = await Api.get("/logout");

        if (data.success) {
            localStorage.removeItem("userInfo");

            props.loggedInToggleHandler();
            handleClose();
            props.history.push("/");
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
                        <button
                            onClick={handleClose}
                            className="bttn-material-flat bttn-sm mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={logOutHandler}
                            className="bttn-material-flat bttn-sm update-account-modal-btn"
                        >
                            Sign Out
                        </button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
});

export default ImageCommentModal;
