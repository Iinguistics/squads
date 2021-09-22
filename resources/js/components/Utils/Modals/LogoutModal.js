import React, { useState } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import Api from "../../Api";

const Test = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const logOutHandler = async () => {
        const { data } = await Api.post("/logout");

        console.log(data);
    };

    const test = async () => {
        let values = {
            email: "test@example.com",
            password: "abc123456",
        };
        const { data } = await Api.post("/login", values);

        //localStorage.setItem("jwt", data.message);

        console.log(data);
    };

    const testGetUser = async () => {
        const { data } = await Api.get("/user");

        console.log(data);
    };
    return (
        <div className="mt-5 text-center">
            <Container>
                <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-dark text-white">
                        Woohoo, you're reading this text in a modal!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={testGetUser}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={logOutHandler}>
                            Log Out
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
            <button onClick={test} className="btn btn-dark mt-5">
                Login test
            </button>
        </div>
    );
};

export default Test;
