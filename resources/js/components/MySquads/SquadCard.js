import React from "react";
import { BsFillPeopleFill } from "react-icons/bs";

const SquadCard = ({ card }) => {
    const renderSquadImg = () => {
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
                return <BsFillPeopleFill />;
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
