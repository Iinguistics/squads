import React from "react";
import { Link } from "react-router-dom";

const SquadCard = ({ card }) => {
    const appUrl = process.env.MIX_APP_URL;

    const renderSquadImg = () => {
        const defaultPhoto = `${appUrl}/images/group.png`;
        if (card.squad) {
            if (card.squad.photo) {
                return (
                    <img
                        src={card.squad.photo}
                        className="card-img-top"
                        alt="squad"
                    />
                );
            } else {
                return (
                    <img
                        src={defaultPhoto}
                        className="card-img-top p-5"
                        alt="squad"
                    />
                );
            }
        }
    };

    const renderSquadBio = () => {
        let trimmed;
        let trimmedBio;
        if (card.squad.bio) {
            trimmed = card.squad.bio.split("");
            if (trimmed.length > 33) {
                trimmedBio = trimmed.slice(0, 33);
                trimmedBio.join("");
                return <p className="card-text">{trimmedBio}...</p>;
            } else {
                return <p className="card-text">{card.squad.bio}</p>;
            }
        } else {
            return <p className="card-text">No Bio</p>;
        }
    };
    return (
        <div className="card squad-card my-4">
            <Link to={`/squad/${card.squad_id}`}>
                {renderSquadImg()}
                <div className="card-body">
                    <h5 className="card-title">{card.squad.squad_name}</h5>
                    <p className="text-muted">{card.squad.game}</p>
                    {renderSquadBio()}
                </div>
            </Link>
        </div>
    );
};

export default SquadCard;
