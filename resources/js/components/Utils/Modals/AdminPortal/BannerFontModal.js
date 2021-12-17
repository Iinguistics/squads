import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Api from "../../../Api";
import SuccessModal from "../SuccessModal";

const BannerFontModal = withRouter((props) => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [fontFamily, setFontFamily] = useState("");
    const [fontColor, setFontColor] = useState("");
    const [gamertag, setGamertag] = useState("");

    useEffect(() => {
        if (props.bannerFontFamilyClicked !== 0) {
            setShow(true);
        }
    }, [props.bannerFontFamilyClicked]);

    const handleClose = () => {
        setShow(false);
    };

    const successReset = () => {
        setSuccess(false);
    };

    const updateFontHandler = async () => {
        if (fontFamily === "" && fontColor === "") {
            setError("To update select a family or a color");
            return;
        }
        // try {
        //     let value = {
        //         gamertag: gamertag,
        //     };
        //     const { data } = await Api.put(
        //         "/update_current_user_account",
        //         value
        //     );

        //     if (data.success) {
        //         setSuccess(true);
        //         setError(false);
        //         setShow(false);
        //     } else {
        //         setSuccess(false);
        //         setError(data.error);
        //     }
        // } catch (error) {
        //     setError(error.message);
        // }
    };

    return (
        <div className="mt-5 text-center">
            <Container>
                <SuccessModal
                    success={success}
                    titleText="Success"
                    bodyText="Your gamertag has been updated."
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
                    <Modal.Header closeButton>
                        <Modal.Title>Update Banner Font</Modal.Title>
                    </Modal.Header>
                    <small className="text-muted ml-3">
                        update the font family & or color
                    </small>

                    <Modal.Body>
                        <label htmlFor="family">Choose font family</label>
                        <br />
                        <select
                            name="family"
                            value={fontFamily}
                            onChange={(e) => setFontFamily(e.target.value)}
                            className="mr-4 p-1 player-search-select mb-3"
                        >
                            <option value="">Select a Family</option>
                            <option value="corinthia">Corinthia</option>
                            <option value="major">Major Mono</option>
                            <option value="smooch">Smooch</option>
                            <option value="vt323">VT323</option>
                        </select>
                        <br />
                        <label htmlFor="color">Choose Font Color</label>
                        <br />
                        <select
                            name="color"
                            value={fontColor}
                            onChange={(e) => setFontColor(e.target.value)}
                            className="mr-4 p-1 player-search-select mb-3"
                        >
                            <option value="">Select a color</option>
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="orange">Orange</option>
                            <option value="pink">Pink</option>
                            <option value="purple">Purple</option>
                        </select>
                        <br />
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
                            onClick={updateFontHandler}
                            className="bttn-material-flat bttn-sm update-account-modal-btn"
                        >
                            Update
                        </button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
});

export default BannerFontModal;