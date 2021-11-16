import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Api from "../../Api";
import SuccessModal from "./SuccessModal";

const CreateSquadModal = withRouter((props) => {
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const [name, setName] = useState("");
    const [game, setGame] = useState("cod");
    const [activelyRecruiting, setActivelyRecruiting] = useState(1);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (props.createSquadClicked !== 0) {
            setShow(true);
        }
    }, [props.createSquadClicked]);

    const handleClose = () => setShow(false);

    const createSquadHandler = async (e) => {
        e.preventDefault();

        const { data } = await Api.get("/logout");

        if (data.success) {
            localStorage.removeItem("userInfo");

            handleClose();
            props.history.push("/");
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
                    bodyText="Squad successfully created"
                    buttonText="Got it"
                    tab="myProfile"
                    successReset={successReset}
                />
                <Modal
                    show={show}
                    onHide={handleClose}
                    className="account-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Create a Squad</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={createSquadHandler}>
                            <label htmlFor="name">Enter squad name</label>
                            <input
                                type="text"
                                className="form-control block shadow-none mb-3"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                name="name"
                            />
                            <label htmlFor="game">Choose game</label>
                            <br />
                            <select
                                name="game"
                                value={game}
                                onChange={(e) => setGame(e.target.value)}
                                className="mr-4 p-1 player-search-select mb-3"
                            >
                                <option value="cod">
                                    Call of Duty: Vanguard
                                </option>
                            </select>
                            <br />
                            <label htmlFor="game">Squad photo</label>
                            <span className="text-muted">(optional)</span>
                            <br />
                            <input
                                type="file"
                                className="mb-3"
                                id="form-input-no-underline"
                                onChange={(e) =>
                                    setSelectedFile(e.target.files[0])
                                }
                            />
                            <br />
                            <label htmlFor="recruiting">
                                Actively Recruiting?
                            </label>
                            <br />
                            <select
                                name="recruiting"
                                value={activelyRecruiting}
                                onChange={(e) =>
                                    setActivelyRecruiting(e.target.value)
                                }
                                className="mr-4 p-1 player-search-select mb-3"
                            >
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </form>
                        {error && <span className="text-danger">{error}</span>}
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            onClick={handleClose}
                            className="bttn-material-flat bttn-sm mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={createSquadHandler}
                            className="bttn-material-flat bttn-sm update-account-modal-btn"
                        >
                            Create
                        </button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
});

export default CreateSquadModal;
