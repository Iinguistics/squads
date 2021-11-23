import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import SuccessModal from "./SuccessModal";
import Api from "../../Api";

const SendSquadInviteModal = withRouter((props) => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [mySquads, setMySquads] = useState(null);
    const [selectedSquad, setSelectedSquad] = useState(0);
    const [note, setNote] = useState("");

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
            return mySquads.map((squad, idx) => {
                return (
                    <option key={idx} value={squad.squad_id}>
                        {squad.squad.squad_name}
                    </option>
                );
            });
        }
    };

    const renderNumberOfSquads = () => {
        if (mySquads) {
            if (mySquads.length === 1) {
                return (
                    <p className="text-muted number-of-squads">
                        You are a member of 1 squad
                    </p>
                );
            } else {
                return (
                    <p className="text-muted">
                        You are a member of {mySquads.length} squad's
                    </p>
                );
            }
        }
    };

    const sendInviteHandler = async (e) => {
        e.preventDefault();

        if (selectedSquad === 0) {
            setError("You must choose a squad");
            return;
        }

        try {
            let values = {
                squad_id: selectedSquad,
                sent_to_id: props.profileData.id,
                note: note,
            };
            const { data } = await Api.post("/create_squad_invite", values);

            if (data.success) {
                setSuccess(true);
                setError("");
                setNote("");
                setShow(false);
            } else {
                setSuccess(false);
                setError(data.error);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const successReset = () => {
        setSuccess(false);
    };

    return (
        <div className="mt-5 text-center number-of-squads">
            <Container>
                <SuccessModal
                    success={success}
                    titleText="Success"
                    bodyText="Invite sent."
                    buttonText="Got it"
                    successReset={successReset}
                />
                <Modal show={show} onHide={handleClose} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Choose the squad you wish to invite{" "}
                            {props.profileData
                                ? props.profileData.user.username
                                : ""}{" "}
                            to
                            {renderNumberOfSquads()}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={sendInviteHandler}>
                            <select
                                value={selectedSquad}
                                onChange={(e) =>
                                    setSelectedSquad(Number(e.target.value))
                                }
                                className="mb-2"
                            >
                                <option value="">--Select a squad--</option>
                                {renderSquads()}
                            </select>
                            {error && (
                                <span className="text-danger ml-2">
                                    {error}
                                </span>
                            )}
                            <br />
                            <label htmlFor="note">Leave a note</label>{" "}
                            <span className="text-muted">(optional)</span>
                            <br />
                            <textarea
                                id="note"
                                rows="4"
                                cols="33"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Hey, you should join our squad, we are looking for a fast paced smg player like yourself!"
                            />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            onClick={handleClose}
                            className="bttn-material-flat bttn-sm mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={sendInviteHandler}
                            className="bttn-material-flat bttn-sm update-account-modal-btn"
                        >
                            Send Invite
                        </button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
});

export default SendSquadInviteModal;
