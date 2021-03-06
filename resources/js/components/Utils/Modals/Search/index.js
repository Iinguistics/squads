import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import PlayerProfile from "./PlayerProfile";
import PlayerStats from "./PlayerStats";

const index = withRouter((props) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (props.searchClicked !== 0) {
            setShow(true);
        }
    }, [props.searchClicked]);

    const handleClose = () => setShow(false);

    return (
        <div className="mt-5">
            <Container>
                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Player search</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <PlayerProfile handleClose={handleClose} />
                    </Modal.Body>
                    <div className="search-modal-divider m-auto"></div>
                    <Modal.Body>
                        <PlayerStats handleClose={handleClose} />
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
