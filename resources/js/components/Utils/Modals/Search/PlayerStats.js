import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import "../../../../../css/bttn/bttn.min.css";
import Api from "../../../Api";

const PlayerStats = withRouter((props) => {
    const [error, setError] = useState("");
    const [gamertag, setGamertag] = useState("");
    const [platform, setPlatform] = useState("psn");

    const searchProfileHandler = async (e) => {
        e.preventDefault();

        try {
            let values = { platform: platform, gamertag: gamertag };

            const { data } = await Api.post("/search_player_profile", values);

            if (data.success) {
                setError("");
                props.history.push(`profile/${data.id}`);
                props.handleClose();
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError(error.message);
        }
    };
    console.log(platform);

    return (
        <div className="my-3">
            <Row>
                <Col>
                    {error && <span className="text-danger">{error}</span>}
                    <form onSubmit={searchProfileHandler}>
                        <label>Search for a player's stats</label>
                        <br />
                        <select
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                            className="mr-4 p-1 player-search-select"
                        >
                            <option value="psn">PlayStation Network</option>
                            <option value="battle">Battle.net</option>
                            <option value="xbl">Xbox Live</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Enter player's gamertag"
                            value={gamertag}
                            onChange={(e) => setGamertag(e.target.value)}
                            className="shadow-none mr-1"
                        />
                        <button
                            className="bttn-unite bttn-sm bttn-primary"
                            type="submit"
                            disabled={!gamertag}
                        >
                            Search
                        </button>
                    </form>
                </Col>
            </Row>
        </div>
    );
});

export default PlayerStats;
