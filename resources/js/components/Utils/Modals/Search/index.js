import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import PlayerProfile from "./PlayerProfile";

const index = withRouter((props) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (props.searchClicked !== 0) {
            setShow(true);
        }
    }, [props.searchClicked]);

    const handleClose = () => setShow(false);

    return (
        <div className="mt-5 text-center">
            <Container>
                <Modal show={show} onHide={handleClose} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Player search</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <PlayerProfile />
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            onClick={handleClose}
                            className="bttn-material-flat bttn-sm mr-2"
                        >
                            Cancel
                        </button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
});

export default index;
