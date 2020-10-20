import React from 'react';

import './referendumCard.scss';

function ReferendumCard({ contest }) {
    return (
        <div className="referendumCard">
            <div className="referendumCard__hd">
                <span className="referendumCard__type">{contest.type}</span>
                <h3 className="referendumCard__title">{contest.referendumTitle}</h3>
            </div>
            <div className="referendumCard__bd">
                {contest.referendumText && <p className="referendumCard__text">{contest.referendumText}</p>}
                {contest.referendumUrl && (
                    <a href={contest.referendumUrl} className="referendumCard__url" target="_blank" rel="noopener noreferrer">
                        Learn More
                    </a>
                )}
            </div>
        </div>
    );
}

export default ReferendumCard;
