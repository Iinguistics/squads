import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Api from "../../Api";
import SuccessModal from "./SuccessModal";

const CreateSquadModal = withRouter((props) => {
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [game, setGame] = useState("vanguard");
    const [recruiting, setRecruiting] = useState(1);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (props.createSquadClicked !== 0) {
            setShow(true);
        }
    }, [props.createSquadClicked]);

    const handleClose = () => setShow(false);

    const createSquadHandler = async (e) => {
        e.preventDefault();

        if (!name || !game) {
            setError("All Fields Required");
            return;
        }

        try {
            setLoading(true);
            let values = {
                squad_name: name,
                game: game,
                recruiting: recruiting,
            };
            const { data } = await Api.post("/create_squad", values);

            if (data.success) {
                setSuccess(true);
                setError(false);
                setShow(false);
                setLoading(false);
                props.fetchMySquadsHandler();
            } else {
                setSuccess(false);
                setError(data.error);
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
                    bodyText="Squad successfully created"
                    buttonText="Got it"
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
                                <option value="vanguard">
                                    Call of Duty: Vanguard
                                </option>
                            </select>
                            <br />
                            <label htmlFor="recruiting">
                                Actively Recruiting?
                            </label>
                            <br />
                            <select
                                name="recruiting"
                                value={recruiting}
                                onChange={(e) => setRecruiting(e.target.value)}
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
