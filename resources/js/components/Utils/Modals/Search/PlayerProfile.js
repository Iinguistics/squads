import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import "../../../../../css/bttn/bttn.min.css";
import Api from "../../../Api";

const PlayerProfile = ({}) => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [gamertag, setGamertag] = useState("");
    const [platform, setPlatform] = useState("");

    const updateProfileHandler = async (e) => {
        e.preventDefault();

        try {
            let value = { font_color: fontColor };

            const { data } = await Api.put(
                "/update_current_user_profile",
                value
            );

            if (data.success) {
                setSuccess(true);
                setError(false);
            } else {
                setSuccess(false);
                setError(true);
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
                    <form onSubmit={updateProfileHandler}>
                        <label>Search player profile</label>
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
                            placeholder="Enter gamertag"
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
};

export default PlayerProfile;
