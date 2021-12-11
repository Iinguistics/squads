import React from "react";

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
    return (
        <div className="card squad-card cursor-pointer">
            {renderSquadImg()}
            <div className="card-body">
                <h5 className="card-title">{card.squad.squad_name}</h5>
                <p className="text-muted">{card.squad.game}</p>
                <p className="card-text">
                    {card.squad.bio ? card.squad.bio : "No bio"}
                </p>
            </div>
        </div>
    );
};

export default SquadCard;
