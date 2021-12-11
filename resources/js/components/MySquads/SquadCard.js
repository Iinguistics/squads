import React from "react";
import { BsFillPeopleFill } from "react-icons/bs";

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
        <div className="card squad-card">
            {renderSquadImg()}
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                </p>
            </div>
        </div>
    );
};

export default SquadCard;
