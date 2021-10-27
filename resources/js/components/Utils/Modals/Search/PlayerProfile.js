import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import "../../../../../css/bttn/bttn.min.css";
import Api from "../../../Api";

const PlayerProfile = withRouter((props) => {
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");

    const searchProfileHandler = async (e) => {
        e.preventDefault();

        try {
            let value = { username: username };

            const { data } = await Api.post("/search_player_profile", value);

            if (data.success) {
                setError("");
                props.history.push(`/profile/${data.id}`);
                props.handleClose();
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="my-3">
            <Row>
                <Col>
                    {error && <span className="text-danger">{error}</span>}
                    <form onSubmit={searchProfileHandler}>
                        <label>Search for a player's profile</label>
                        <br />
                        <input
                            type="text"
                            placeholder="Enter player's username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="shadow-none mr-1"
                        />
                        <button
                            className="bttn-unite bttn-sm bttn-primary"
                            type="submit"
                            disabled={!username}
                        >
                            Search
                        </button>
                    </form>
                </Col>
            </Row>
        </div>
    );
});

export default PlayerProfile;
