import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Api from "../../Api";

const SendSquadInviteModal = withRouter((props) => {
    const [show, setShow] = useState(false);
    const [mySquads, setMySquads] = useState(null);

    const fetchMySquadsHandler = async () => {
        const { data } = await Api.get("/fetch_my_squads");
        setMySquads(data.data);
    };

    useEffect(() => {
        fetchMySquadsHandler();
    }, []);
    console.log(mySquads, "mySquads");

    useEffect(() => {
        if (props.sendSquadInviteClicked !== 0) {
            setShow(true);
        }
    }, [props.sendSquadInviteClicked]);

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

    const renderSquads = () => {
        if (mySquads) {
            return mySquads.map((squad) => {
                return (
                    <div key={squad.squad_id}>
                        <h5>{squad.squad.squad_name}</h5>
                        <div className="light-divider"></div>
                    </div>
                );
            });
        }
    };

    return (
        <div className="mt-5 text-center">
            <Container>
                <Modal show={show} onHide={handleClose} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Choose the squad you wish to invite{" "}
                            {props.profileData
                                ? props.profileData.user.username
                                : ""}{" "}
                            to
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{renderSquads()}</Modal.Body>
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

export default SendSquadInviteModal;
